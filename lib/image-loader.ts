/**
 * next/image loader for the static export (GitHub Pages has no image server).
 *
 * `npm run build` runs scripts/postbuild.mjs, which pre-generates a WebP copy of every JPG/PNG at each
 * width in images.deviceSizes + images.imageSizes, named `<file>.w<width>.webp` next to the original
 * (out/_next/static/media/… for imported photos, out/media/… for public files). This loader points
 * <Image> srcsets at those copies. In `next dev` it returns the original file (no copies exist there).
 */
const BASE = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (/^(data:|blob:|https?:)/.test(src)) return src;
  if (process.env.NODE_ENV !== "production") return `${src}?w=${width}`;
  const path = BASE && src.startsWith(BASE + "/") ? src : BASE + src;
  const m = path.match(/^(.*)\.(jpe?g|png)$/i);
  return m ? `${m[1]}.w${width}.webp` : path;
}
