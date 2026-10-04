> Diperbarui dari kode terbaru (repomix Oktober 2026). Versi lama berisi 5 saran perbaikan dari analisis sebelumnya. Sebagian besar sudah dikerjakan dengan cara lain, jadi file ini sekarang berisi **status**, **jawaban kenapa `@config` bermasalah**, dan **sisa pekerjaan yang benar-benar masih terbuka**.
> Aturan kerja tetap mengikuti `AGENTS.md`: Caveman dulu, perubahan sekecil mungkin, jangan ubah hal yang tidak diminta.

---

## 1. Status tiap poin lama

| # | Poin lama | Status | Bukti di kode sekarang |
|---|---|---|---|
| 1 | Breakpoint custom tidak terbaca di Tailwind v4 | ✅ **Selesai, dengan cara lain** | `app/globals.css` punya `@theme { --breakpoint-xs: 375px; … --breakpoint-xl: 1440px; --breakpoint-2xl: 1920px }` dan `@plugin 'tailwind-scrollbar'`. `tailwind.config.js` **tidak dibaca** dan sekarang file mati. |
| 2 | Tombol di-center dengan `mx-[…px]` | ✅ **Selesai** | CTA Home: `flex justify-center` + `w-fit` membungkus `Magnet`. WorkCards: tombol diganti "View GitHub" di baris flex (`sm:flex-row sm:justify-between`). Tidak ada lagi `mx-[…px]` per breakpoint. |
| 3 | Typo `sm:block sm:hidden` di hero mobile | ✅ **Selesai** | `app/page.tsx`: `block w-full min-w-0 sm:hidden` (mobile) dan `hidden w-full min-w-0 sm:block` (desktop). |
| 4 | `h-screen` kaku → `min-h-dvh` | ⚠️ **Sebagian** | About sudah `min-h-dvh`. **Masih `h-screen`:** `blog/page.tsx` (`h-screen`), `contact/page.tsx` (`md:h-screen`), `about/team/page.tsx`. Services memakai `min-h-screen` (bukan masalah besar, tapi `min-h-dvh` lebih tepat di HP). |
| 5 | Export `viewport` di `layout.tsx` | ❎ **Tidak perlu** | Next.js 15 sudah menambahkan `<meta name="viewport" content="width=device-width, initial-scale=1">` secara otomatis. `maximumScale: 5` tidak memperbaiki apa pun, jadi tidak ditambahkan. |

---

## 2. Kenapa `@config "../tailwind.config.js";` di `globals.css` tidak bisa?

Saya tidak bisa melihat pesan error aslinya, jadi ini penyebab yang paling mungkin dari kode dan snippet lama, berurutan dari yang paling mungkin:

1. **Urutan baris salah.** Snippet lama menaruh `@config` **sebelum** `@import 'tailwindcss';` (bahkan ditulis dalam satu baris). Di CSS, `@import` harus berada paling atas (hanya `@charset` / `@layer` yang boleh mendahului). Kalau `@config` ditaruh di atasnya, `@import` dianggap tidak valid dan build/CSS jadi rusak. Urutan yang benar menurut dokumentasi Tailwind v4:

   ```css
   @import 'tailwindcss';
   @config "../tailwind.config.js";
   ```

   Path `../tailwind.config.js` sendiri sudah benar dari `app/globals.css` ke root repo.

2. **Isi `tailwind.config.js` bukan format v4.** Ada `purge: []` dan `variants: {}` (kunci Tailwind v2) dan `require('tailwind-scrollbar')`. Tailwind v4 mengabaikan sebagian opsi lama dan tidak mendukung beberapa opsi config sama sekali (misalnya `corePlugins`, `safelist`, `separator`). Jadi hasilnya tidak bisa diandalkan.

3. **Duplikasi dengan yang sudah ada.** `globals.css` sekarang sudah mendefinisikan breakpoint yang sama lewat `@theme` dan memuat plugin lewat `@plugin 'tailwind-scrollbar'`. Menambah `@config` berarti breakpoint didefinisikan dua kali dan plugin scrollbar dimuat dua kali.

**Keputusan: jangan tambahkan `@config`.** Masalah yang ingin diselesaikan poin 1 sudah selesai lewat `@theme`. Kalau nanti mau merapikan, hapus `tailwind.config.js` sebagai tugas terpisah (bukan efek samping tugas lain).

Kalau kamu tetap ingin mencobanya dan masih error setelah urutan dibetulkan, kirim teks error persisnya dari terminal/browser, supaya penyebabnya bisa dipastikan.

---

## 3. Sisa pekerjaan yang masih terbuka (opsional, kerjakan satu per satu)

Semua perubahan di bawah hanya mengubah class/struktur kecil. Setelah mengubah, cek light + dark mode, lebar 375 / 768 / 1024 / 1440, dan satu viewport 16:10 (misalnya 1440×900).

### 3.1 `contact/page.tsx` — `md:h-screen` → `md:min-h-dvh`

Ganti `md:h-screen` menjadi `md:min-h-dvh` di `className` `<main>`. Sekalian hapus `md:pt[49px]` (kurang tanda `-`, class itu memang tidak melakukan apa pun, jadi menghapusnya tidak mengubah tampilan) dan `lg:flex-1-reverse` (bukan class Tailwind).

### 3.2 `blog/page.tsx` — `h-screen` → `min-h-dvh`

Ganti `h-screen` menjadi `min-h-dvh`, hapus `md:pt[49px]` dan `lg:flex-1-reverse`.

Catatan penting: panel daftar post sekarang `h-full overflow-y-auto`, yaitu bergantung pada tinggi induk yang dipaksa. Dengan `min-h-dvh`, `h-full` tidak lagi punya tinggi pasti, jadi daftar akan memanjang dan yang scroll adalah halaman. Kalau panel scroll mau dipertahankan, ganti `h-full` pada div daftar menjadi `max-h-[70dvh]`.

### 3.3 `<main>` bersarang (`layout.tsx` sudah punya `<main>`)

`about/page.tsx`, `contact/page.tsx`, `blog/page.tsx`, dan `blog/layout.tsx` masing-masing menambah `<main>` lagi di dalam `<main>` layout. Ganti `<main>` di halaman-halaman itu menjadi `<div>` (tidak ada gaya bawaan `<main>`, jadi tampilan tidak berubah).

### 3.4 `blog/layout.tsx` — tulisan "Admin Layout"

Layout ini masih placeholder: merender `<header>Admin Layout</header>` di semua halaman blog. Ini bug yang terlihat. Perbaikan paling kecil: layout hanya me-return `{children}` (atau hapus file-nya). Kerjakan hanya kalau memang diminta.

### 3.5 Hal lain yang ditemukan saat memperbarui dokumen (hanya dilaporkan)

Rinciannya ada di `DESIGN.md` §12 dan `ARCHITECTURE.md` §14. Yang paling berpengaruh:

- `alternates.canonical: "/"` di `layout.tsx` bisa diwariskan ke semua halaman (cek dengan view-source di `/blog/1`). Ini memengaruhi indeks Google, jadi sebaiknya diperbaiki sebagai tugas SEO tersendiri.
- `/og-image.png` dirujuk di metadata tetapi file-nya tidak ada di repo.
- Isi artikel blog di-render di sisi klien (`MarkdownContent` memakai `useEffect`), jadi HTML awal dari server tidak berisi teks artikel.
- Kelas `prose` di halaman post tidak berefek karena plugin typography tidak terpasang.
- Teks putih di atas tombol aksen (`dark:text-white`) kontrasnya 2.89:1 di dark mode.
- `.wrangler/` belum masuk `.gitignore`.

---

## 4. Verifikasi

- Perubahan UI: cek di browser (light/dark, 375px dan desktop, plus rasio 16:10).
- `npm run build` untuk memastikan build Next lolos.
- `npm run preview` bila menyentuh kode server, metadata, atau file deploy. **Jangan** menjalankan `npm run deploy` kecuali diminta.
- `npm run lint` tidak bisa dijadikan acuan (deprecated di Next 15.5 dan tidak ada konfigurasi ESLint).