import type { MetadataRoute } from "next";
import { posts } from "./posts/data";

/*
 * Domain utama. Pakai SATU versi saja (tanpa www atau dengan www) dan
 * samakan dengan properti yang kamu daftarkan di Google Search Console
 * serta tujuan redirect 301 di Cloudflare.
 */
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ariaaji.com"
).replace(/\/$/, "");

/*
 * Halaman statis. /about/team sengaja tidak dimasukkan karena isinya masih
 * kosong (placeholder). Tambahkan di sini kalau halamannya sudah berisi.
 */
const STATIC_ROUTES = ["", "/about", "/services", "/contact", "/blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${encodeURIComponent(post.id)}`,
    lastModified: new Date(post.date),
  }));

  /* Halaman /blog ikut berubah setiap ada post baru */
  const latestPostDate = posts.length
    ? new Date(Math.max(...posts.map((p) => new Date(p.date).getTime())))
    : undefined;

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    ...(path === "/blog" && latestPostDate
      ? { lastModified: latestPostDate }
      : {}),
  }));

  return [...staticEntries, ...postEntries];
}