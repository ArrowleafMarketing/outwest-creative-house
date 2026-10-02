/**
 * One-off importer: reads the full-resolution originals from the client Drive and
 * writes web-ready masters into src/photos/files.
 *
 *   node scripts/import-photos.mjs [--source "<dir>"] [--max 2560] [--quality 78]
 *
 * Originals stay in the Drive — they total ~1.2 GB and must never enter the repo.
 * Masters are capped on the long edge and re-encoded to WebP; `next/image` then
 * generates the responsive variants it actually serves, so this only needs to be
 * large enough for the biggest rendering (full-bleed on a 2x display).
 *
 * Re-run after adding originals; existing masters are overwritten in place.
 */
import { readdir, mkdir, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const opt = (flag, fallback) => {
  const i = args.indexOf(flag);
  return i === -1 ? fallback : args[i + 1];
};

const SOURCE = opt(
  "--source",
  "/Users/ryanmata/Library/CloudStorage/GoogleDrive-ryan@arrowleafmarketing.com/.shortcut-targets-by-id/1ICKtauZPVCXhNME19VxNjvon1El4mMUv/Arrowleaf Marketing & Media/OutWest Studios/Photo",
);
const MAX = Number(opt("--max", 2560));
const QUALITY = Number(opt("--quality", 78));
const OUT = "src/photos/files";

const slug = (s) =>
  s
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(jpe?g|png|tiff?)$/i.test(e.name)) out.push(p);
  }
  return out;
}

await mkdir(OUT, { recursive: true });
const files = (await walk(SOURCE)).sort();

// Group by content hash first, so that when the Drive holds "X.jpg" and "X (1).jpg" we
// keep the canonical name rather than whichever happened to sort first.
const byHash = new Map();
for (const src of files) {
  const hash = createHash("sha256").update(readFileSync(src)).digest("hex").slice(0, 16);
  if (!byHash.has(hash)) byHash.set(hash, []);
  byHash.get(hash).push(src);
}

const chosen = [];
let skipped = 0;
for (const group of byHash.values()) {
  // Shortest basename wins — "DSC_8996.jpg" over "DSC_8996 (1).jpg".
  const keep = group.slice().sort(
    (a, b) => path.basename(a).length - path.basename(b).length || a.localeCompare(b),
  )[0];
  for (const other of group) {
    if (other !== keep) {
      console.log(
        `dup   ${path.basename(other)} — same bytes as ${path.basename(keep)}, skipped`,
      );
      skipped++;
    }
  }
  chosen.push(keep);
}
chosen.sort();

let written = 0;
let bytesIn = 0;
let bytesOut = 0;

for (const src of chosen) {

  bytesIn += (await stat(src)).size;
  const name = `${slug(path.basename(src))}.webp`;
  const dest = path.join(OUT, name);

  const info = await sharp(src)
    .rotate()
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(dest);

  bytesOut += info.size;
  written++;
  console.log(
    `ok    ${name.padEnd(42)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`,
  );
}

console.log(
  `\n${written} written, ${skipped} duplicate(s) skipped\n` +
    `${(bytesIn / 1e9).toFixed(2)} GB in → ${(bytesOut / 1e6).toFixed(1)} MB out`,
);
