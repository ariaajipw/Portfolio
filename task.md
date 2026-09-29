Berdasarkan analisis lengkap dari repositori Anda (repomix-output.xml), ada beberapa penyebab utama mengapa tampilan web Anda terasa bergeser, tidak simetris, atau kurang responsif saat dibuka di device berlayar berbeda seperti Axioo Hype 5 (16:9, 1080p) vs ROG Zephyrus G14 (16:10, 3K/QHD).

Berikut adalah bagian-bagian kode yang bermasalah beserta panduan perbaikannya:

1. Masalah Utama: Tailwind CSS v4 Tidak Membaca tailwind.config.js
Di file tailwind.config.js, Anda telah mendefinisikan custom breakpoints (xs: 375px, xl: 1440px, 2xl: 1920px). Namun, proyek Anda menggunakan Tailwind CSS v4 (@import 'tailwindcss'; di app/globals.css).

Penyebab: Di Tailwind v4, file tailwind.config.js diabaikan secara default jika tidak dihubungkan dengan @config. Akibatnya, breakpoint xs: tidak berfungsi, dan xl: memicu di 1280px (bukan 1440px). Di laptop dengan Windows Display Scaling berbeda (125% vs 150%), titik lompatan layout (breakpoint) jadi tidak konsisten.

🛠️ Perbaikan: Update app/globals.css
Tambahkan arahan @config di paling atas file app/globals.css:

CSS

/* app/globals.css */@config "../tailwind.config.js";@import 'tailwindcss';@custom-variant dark (&:where(.dark, .dark *));
...
2. Centering Tombol Menggunakan Margin Piksel Kaku (mx-[...px])
Di halaman utama dan komponen WorkCard, Anda mengetengahkan tombol dengan cara brute-force memberikan margin piksel berbeda di setiap breakpoint:
mx-[90px] sm:mx-[225px] md:mx-[280px] lg:mx-[100px] xl:mx-[227px] 2xl:mx-[280px].

Penyebab: Ketika lebar viewport berbeda sedikit saja (misalnya akibat tingkat zoom Windows atau rasio layar), nilai piksel manual ini membuat tombol terdorong ke kiri atau ke kanan dan tidak berada di tengah.

🛠️ Perbaikan 1: app/page.tsx (Tombol "Let's Collaborate")
Ubah wrapper tombol dari margin piksel manual menjadi flex justify-center:

Sebelum:

TypeScript

<Magnet padding={50} disabled={false} magnetStrength={2}>
  <Link 
    href="/contact"
    className="button border-black dark:border-black p-3 rounded-full content-center place-self-center w-[130px] text-center bg-[#FA6B48] hover:bg-black dark:hover:bg-white text-black hover:text-[#FA6B48] mx-[90px] sm:mx-[225px] md:mx-[280px] lg:mx-[100px] xl:mx-[227px] 2xl:mx-[280px]"
  >
    Let's Collaborate
  </Link>
</Magnet>
Sesudah:

TypeScript

<div className="flex justify-center mt-8">
  <Magnet padding={50} disabled={false} magnetStrength={2}>
    <Link 
      href="/contact"
      className="inline-block border-black dark:border-black p-3 rounded-full w-[160px] text-center bg-[#FA6B48] hover:bg-black dark:hover:bg-white text-black hover:text-[#FA6B48] transition-colors"
    >
      Let's Collaborate
    </Link>
  </Magnet>
</div>
🛠️ Perbaikan 2: app/components/WorkCard/workcard.tsx (Tombol "See All Projects")
Sebelum:

TypeScript

<Magnet padding={50} disabled={false} magnetStrength={2}>
  <Link 
    href="https://github.com/ariaajipw"
    ...
    className="... mx-[80px] sm:mx-[205px] md:mx-[278px] lg:mx-[100px] xl:mx-[227px] 2xl:mx-[280px]"
  >
    See All Projects
  </Link>
</Magnet>
Sesudah:

TypeScript

<div className="flex justify-center mt-10">
  <Magnet padding={50} disabled={false} magnetStrength={2}>
    <Link 
      href="https://github.com/ariaajipw"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block border-black dark:border-black p-3 rounded-full w-[160px] text-center bg-[#FA6B48] hover:bg-black dark:hover:bg-white text-black hover:text-[#FA6B48] transition-colors"
    >
      See All Projects
    </Link>
  </Magnet>
</div>
3. Typo Class CSS Bentrok di Hero Mobile (app/page.tsx)
Di app/page.tsx baris 25, terdapat kombinasi class CSS yang saling bertabrakan:

TypeScript

<div className="sm:block sm:hidden" ...>
Penyebab: Class sm:block dan sm:hidden ditulis bersamaan untuk container teks Hero versi mobile. Ini membuat browser bingung apakah container harus ditampilkan atau disembunyikan di layar sm (640px+).

🛠️ Perbaikan:
Ganti menjadi:

TypeScript

<div className="block sm:hidden" ...>
4. Penggunaan h-screen Kaku vs min-h-dvh
Di beberapa halaman seperti app/contact/page.tsx (md:h-screen) dan app/blog/page.tsx (h-screen), tinggi container dipaksa tepat 100% tinggi layar.

Penyebab: Layar 16:9 (Axioo) dan 16:10 (Zephyrus) memiliki proporsi tinggi yang berbeda. Memaksa h-screen menyebabkan konten terpotong atau memicu scroll ganda (dual scrollbar) jika konten melebihi tinggi layar.

🛠️ Perbaikan 1: app/contact/page.tsx
Ganti md:h-screen menjadi min-h-dvh dengan padding yang fleksibel.

TypeScript

export default function Contact() {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 items-start pt-[120px] pb-[60px] px-[20px] xl:px-[100px] 2xl:px-[220px] lg:gap-x-[30px] min-h-dvh">
      <div className="flex col-span-1 h-full lg:px-10 justify-center items-center">
        <div className="font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-[150%] mb-8">
          <span className="font-black">Building thoughtful, interactive, and accessible web experiences.</span>{" "}
          Turn static ideas into fluid interfaces.{" "}
          <span className="font-bold">Tell me what you’re working on.</span>
        </div>
      </div>

      <div className="col-span-1 h-full flex items-center">
        <ContactSection />
      </div>
    </main>
  );
}
🛠️ Perbaikan 2: app/blog/page.tsx
Ganti h-screen menjadi min-h-dvh dan bersihkan class typo seperti md:pt[49px] (kurang tanda -).

TypeScript

export default function BlogPage() {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 items-start pt-[120px] pb-[60px] px-[20px] xl:px-[100px] 2xl:px-[220px] lg:gap-x-[30px] min-h-dvh">
      <div className="flex col-span-1 h-full lg:px-10 justify-center items-center">
        <div className="font-bold text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl leading-[150%] mb-8">
          This is a platform for living story of ideas and experiences, & space for thoughtful reflection.
        </div>
      </div>

      <div className="col-span-1 h-full flex items-center overflow-hidden">
        <div className="w-full max-h-[70vh] overflow-y-auto space-y-8 pr-2 scroll-custom">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.id}`}
                className="block p-2 border-4 border-gray-600 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition"
              >
                <div className="p-4 border-2 border-gray-400 rounded-lg hover:bg-[#FA6B48]">
                  <h2 className="text-xl font-semibold">{post.title}</h2>
                  <p className="text-gray-500 text-sm">{post.date}</p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </main> 
  );
}
5. Penambahan Metadata Viewport di app/layout.tsx
Untuk memastikan layar perangkat seluler dan desktop membaca skala layar awal secara konsisten:

🛠️ Perbaikan: app/layout.tsx
Tambahkan konfigurasi viewport pada metadata Next.js:

TypeScript

import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Aria Aji",
  description: "Portfolio",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};
Ringkasan Langkah Kerja:
Tambahkan @config "../tailwind.config.js"; di app/globals.css.

Hapus margin manual mx-[...px] pada tombol, ganti dengan wrapper flex justify-center.

Koreksi typo sm:block sm:hidden di app/page.tsx menjadi block sm:hidden.

Ganti h-screen kaku di halaman Contact & Blog menjadi min-h-dvh.

Setelah menerapkan 4 poin ini, layout Anda akan otomatis simetris dan menyesuaikan skala layar di device apa pun (baik Axioo Hype 5, ROG Zephyrus G14, maupun layar HP).

knp ga bisa ya aku mau menambahkan @config di globals.css