// stock.ts — royalty-free stock image search for /carrusel variant (c),
// publish-grade. Four providers return license-clear images with attribution
// metadata; only two need a free key:
//   • Openverse (default) — aggregates CC-licensed images (Flickr, Wikimedia, etc.),
//                            filtered to commercial+modification-safe licenses. No key.
//   • Wikimedia Commons    — CC0/CC-BY/CC-BY-SA media, per-image license. No key.
//   • Pexels               — Pexels License, free for commercial use, no attribution
//                            required (appreciated). Key: PEXELS_API_KEY.
//   • Unsplash             — Unsplash License, free to use; attribution appreciated.
//                            Key: UNSPLASH_ACCESS_KEY (a "Client-ID").
//
// Free keys (optional providers only): pexels.com/api  /  unsplash.com/developers

import { join } from "node:path";
import { writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { downloadFile } from "./download.js";

export type StockProvider = "openverse" | "wikimedia" | "pexels" | "unsplash";

const USER_AGENT = "ig-carousel-studio/1.0 (https://github.com/elpapadoctor/ig-carousel-studio)";

export interface StockImage {
  url: string;          // downloadable, license-clear image URL
  width: number;
  height: number;
  photographer: string; // attribution name
  sourceUrl: string;    // page on the provider (for attribution / review)
  alt: string;
  provider: StockProvider;
  license?: string;     // per-image license — set for openverse/wikimedia, whose
                         // license varies by image (unlike pexels/unsplash's blanket license)
}

export interface StockSearchOpts {
  provider?: StockProvider;
  perPage?: number;                                  // results per query (default 15)
  orientation?: "landscape" | "portrait" | "square"; // optional bias
}

function pexelsKey(): string {
  const k = process.env["PEXELS_API_KEY"];
  if (!k) throw new Error("PEXELS_API_KEY not set in .env (get one free at pexels.com/api)");
  return k;
}
function unsplashKey(): string {
  const k = process.env["UNSPLASH_ACCESS_KEY"];
  if (!k) throw new Error("UNSPLASH_ACCESS_KEY not set in .env (get one free at unsplash.com/developers)");
  return k;
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]*>/g, "").trim();
}

async function searchOpenverse(query: string, perPage: number, orientation?: string): Promise<StockImage[]> {
  const u = new URL("https://api.openverse.org/v1/images/");
  u.searchParams.set("q", query);
  u.searchParams.set("page_size", String(perPage));
  // Only license types safe to reuse/modify commercially — excludes NC/ND, keeps
  // the same "publicable" guarantee as the Pexels/Unsplash providers.
  u.searchParams.set("license_type", "commercial,modification");
  if (orientation === "square") u.searchParams.set("aspect_ratio", "square");
  else if (orientation === "landscape") u.searchParams.set("aspect_ratio", "wide");
  else if (orientation === "portrait") u.searchParams.set("aspect_ratio", "tall");
  const res = await fetch(u, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`Openverse search failed: HTTP ${res.status} — ${(await res.text()).slice(0, 200)}`);
  const data = (await res.json()) as { results?: Array<Record<string, any>> };
  return (data.results ?? []).map((r) => ({
    url: r["url"],
    width: r["width"] ?? 0,
    height: r["height"] ?? 0,
    photographer: r["creator"] || "Openverse contributor",
    sourceUrl: r["foreign_landing_url"] ?? r["url"] ?? "",
    alt: r["title"] ?? query,
    provider: "openverse" as const,
    license: `CC ${String(r["license"] ?? "").toUpperCase()}${r["license_version"] ? " " + r["license_version"] : ""}`.trim(),
  })).filter((x) => x.url);
}

async function searchWikimedia(query: string, perPage: number): Promise<StockImage[]> {
  const u = new URL("https://commons.wikimedia.org/w/api.php");
  u.searchParams.set("action", "query");
  u.searchParams.set("generator", "search");
  u.searchParams.set("gsrsearch", `filetype:bitmap ${query}`);
  u.searchParams.set("gsrnamespace", "6"); // File: namespace
  u.searchParams.set("gsrlimit", String(perPage));
  u.searchParams.set("prop", "imageinfo");
  u.searchParams.set("iiprop", "url|extmetadata|size");
  u.searchParams.set("iiurlwidth", "1600");
  u.searchParams.set("format", "json");
  u.searchParams.set("origin", "*");
  const res = await fetch(u, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`Wikimedia Commons search failed: HTTP ${res.status} — ${(await res.text()).slice(0, 200)}`);
  const data = (await res.json()) as { query?: { pages?: Record<string, Record<string, any>> } };
  const pages = Object.values(data.query?.pages ?? {});
  const out: StockImage[] = [];
  for (const p of pages) {
    const info = (p["imageinfo"] ?? [])[0];
    if (!info || !info["thumburl"] && !info["url"]) continue;
    const meta = info["extmetadata"] ?? {};
    const license = String(meta["LicenseShortName"]?.["value"] ?? "").trim();
    // Commons policy requires free licenses, but guard defensively against any
    // NC/ND outlier so this stays "publicable" like the other providers.
    if (/\bNC\b|\bND\b/i.test(license)) continue;
    out.push({
      url: info["thumburl"] ?? info["url"],
      width: info["thumbwidth"] ?? info["width"] ?? 0,
      height: info["thumbheight"] ?? info["height"] ?? 0,
      photographer: stripHtml(meta["Artist"]?.["value"] ?? "") || "Wikimedia Commons contributor",
      sourceUrl: info["descriptionurl"] ?? "",
      alt: stripHtml(meta["ImageDescription"]?.["value"] ?? "") || query,
      provider: "wikimedia",
      license: license || "Wikimedia Commons (free license)",
    });
  }
  return out;
}

export async function searchStock(query: string, opts: StockSearchOpts = {}): Promise<StockImage[]> {
  const provider = opts.provider ?? "openverse";
  const perPage = opts.perPage ?? 15;

  if (provider === "openverse") return searchOpenverse(query, perPage, opts.orientation);
  if (provider === "wikimedia") return searchWikimedia(query, perPage);

  if (provider === "pexels") {
    const u = new URL("https://api.pexels.com/v1/search");
    u.searchParams.set("query", query);
    u.searchParams.set("per_page", String(perPage));
    if (opts.orientation) u.searchParams.set("orientation", opts.orientation);
    const res = await fetch(u, { headers: { Authorization: pexelsKey() } });
    if (!res.ok) throw new Error(`Pexels search failed: HTTP ${res.status} — ${(await res.text()).slice(0, 200)}`);
    const data = (await res.json()) as { photos?: Array<Record<string, any>> };
    return (data.photos ?? []).map((p) => ({
      url: p["src"]?.["large2x"] ?? p["src"]?.["original"] ?? p["src"]?.["large"],
      width: p["width"] ?? 0,
      height: p["height"] ?? 0,
      photographer: p["photographer"] ?? "",
      sourceUrl: p["url"] ?? "",
      alt: p["alt"] ?? "",
      provider: "pexels" as const,
    })).filter((x) => x.url);
  }
  // unsplash
  const u = new URL("https://api.unsplash.com/search/photos");
  u.searchParams.set("query", query);
  u.searchParams.set("per_page", String(perPage));
  if (opts.orientation) u.searchParams.set("orientation", opts.orientation);
  const res = await fetch(u, { headers: { Authorization: `Client-ID ${unsplashKey()}` } });
  if (!res.ok) throw new Error(`Unsplash search failed: HTTP ${res.status} — ${(await res.text()).slice(0, 200)}`);
  const data = (await res.json()) as { results?: Array<Record<string, any>> };
  return (data.results ?? []).map((r) => ({
    url: r["urls"]?.["regular"] ?? r["urls"]?.["full"],
    width: r["width"] ?? 0,
    height: r["height"] ?? 0,
    photographer: r["user"]?.["name"] ?? "",
    sourceUrl: r["links"]?.["html"] ?? "",
    alt: r["alt_description"] ?? "",
    provider: "unsplash" as const,
  })).filter((x) => x.url);
}

export interface StockDownloadOpts {
  count?: number;    // total images to download (default 6)
  prefix?: string;   // filename prefix (default "stock")
  destRel?: string;  // dir relative to projectRoot (default "slides/source")
}

export interface DownloadedStock {
  local: string;
  url: string;
  photographer: string;
  sourceUrl: string;
  alt: string;
  provider: StockProvider;
  width: number;
  height: number;
  license?: string;
}

function providerLicenseText(provider: StockProvider): string {
  switch (provider) {
    case "unsplash":
      return "Unsplash License — free to use; attribution appreciated (photographer + unsplash.com).";
    case "openverse":
      return "Mixed CC licenses via Openverse, filtered to commercial+modification-safe — see per-image \"license\" field for the exact license and required attribution.";
    case "wikimedia":
      return "Mixed free licenses via Wikimedia Commons — see per-image \"license\" field for the exact license and required attribution.";
    default:
      return "Pexels License — free for commercial use, no attribution required (appreciated).";
  }
}

// Download top N (deduped) into the project + write a manifest with attribution.
export async function downloadStockImages(
  items: StockImage[],
  projectRoot: string,
  opts: StockDownloadOpts = {},
): Promise<DownloadedStock[]> {
  const count = opts.count ?? 6;
  const prefix = opts.prefix ?? "stock";
  const destRel = opts.destRel ?? "slides/source";

  const seen = new Set<string>();
  const picked = items.filter((it) => (it.url && !seen.has(it.url) && (seen.add(it.url), true))).slice(0, count);

  const out: DownloadedStock[] = [];
  let i = 0;
  for (const it of picked) {
    i++;
    const name = `${prefix}-${String(i).padStart(2, "0")}.jpg`;
    const rel = `${destRel}/${name}`;
    const abs = join(projectRoot, rel);
    if (!existsSync(abs)) await downloadFile(it.url, abs);
    out.push({
      local: rel, url: it.url, photographer: it.photographer, sourceUrl: it.sourceUrl,
      alt: it.alt, provider: it.provider, width: it.width, height: it.height,
      ...(it.license ? { license: it.license } : {}),
    });
    process.stdout.write(`  ${name} ← ${it.provider}: ${it.photographer}${it.license ? ` (${it.license})` : ""}\n`);
  }

  await writeFile(
    join(projectRoot, destRel, `${prefix}-manifest.json`),
    JSON.stringify({
      _license: providerLicenseText(picked[0]?.provider ?? "openverse"),
      generatedFor: "carousel variant (c) — royalty-free",
      images: out,
    }, null, 2),
  );
  return out;
}
