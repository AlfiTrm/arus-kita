import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const iconDir = path.join(publicDir, "icon");
const sourcePath = path.join(iconDir, "aruskita-icon.svg");

const brandBackground = "#028090";
const white = "#ffffff";

const baseSvg = await readFile(sourcePath, "utf8");
const invertedSvg = baseSvg.replaceAll("#008090", white);

async function ensureDir(dirPath) {
  await mkdir(dirPath, { recursive: true });
}

async function renderSquareIcon({
  outputPath,
  size,
  background,
  iconScale,
}) {
  const iconSize = Math.round(size * iconScale);
  const iconBuffer = await sharp(Buffer.from(invertedSvg))
    .resize(iconSize, iconSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background,
    },
  })
    .composite([
      {
        input: iconBuffer,
        left: Math.round((size - iconSize) / 2),
        top: Math.round((size - iconSize) / 2),
      },
    ])
    .png()
    .toFile(outputPath);
}

async function renderFavicon(outputPath, size) {
  const iconSize = Math.round(size * 0.82);
  const iconBuffer = await sharp(Buffer.from(baseSvg))
    .resize(iconSize, iconSize, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: white,
    },
  })
    .composite([
      {
        input: iconBuffer,
        left: Math.round((size - iconSize) / 2),
        top: Math.round((size - iconSize) / 2),
      },
    ])
    .png()
    .toFile(outputPath);
}

await ensureDir(iconDir);

await renderSquareIcon({
  outputPath: path.join(iconDir, "icon-192.png"),
  size: 192,
  background: brandBackground,
  iconScale: 0.66,
});

await renderSquareIcon({
  outputPath: path.join(iconDir, "icon-512.png"),
  size: 512,
  background: brandBackground,
  iconScale: 0.66,
});

await renderSquareIcon({
  outputPath: path.join(iconDir, "icon-maskable-512.png"),
  size: 512,
  background: brandBackground,
  iconScale: 0.78,
});

await renderSquareIcon({
  outputPath: path.join(publicDir, "apple-touch-icon.png"),
  size: 180,
  background: brandBackground,
  iconScale: 0.66,
});

await renderFavicon(path.join(publicDir, "favicon-32x32.png"), 32);
await renderFavicon(path.join(publicDir, "favicon-16x16.png"), 16);

await writeFile(
  path.join(iconDir, "README.md"),
  [
    "# PWA Icons",
    "",
    "Generated from `public/icon/aruskita-icon.svg` via `scripts/generate-pwa-icons.mjs`.",
    "Run `node scripts/generate-pwa-icons.mjs` after updating the source logo.",
    "",
  ].join("\n"),
  "utf8",
);
