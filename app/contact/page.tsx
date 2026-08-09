import ContactSection from "../components/Contact/contact";

export default function ContactPage() {
  return (
    <main className="overflow-x-hidden">
      <header className="px-6 pt-28 sm:pt-36">
        <p className="text-xs uppercase tracking-[0.35em] text-[#FA6B48] text-center mb-6">
          Get in touch
        </p>
        <h1 className="text-center font-bold uppercase leading-none tracking-tight text-[clamp(3.5rem,11vw,11rem)] whitespace-nowrap">
          Contact
        </h1>
        <div className="mx-auto mt-8 h-px w-full max-w-[min(60rem,80vw)] bg-gray-300 dark:bg-gray-700" />
      </header>

      <section className="mx-auto max-w-2xl px-6 py-14 text-center">
        <p className="text-lg sm:text-xl leading-relaxed text-gray-700 dark:text-gray-300">
          Have a project in mind — or just want to say hi?{" "}
          <span className="font-bold text-[#FA6B48]">
            Let&apos;s build something useful together.
          </span>
        </p>

        <a
          href="mailto:ariaajipw@gmail.com"
          className="mt-9 inline-block border-2 border-gray-900 dark:border-gray-100 px-8 py-3 font-bold uppercase tracking-[0.2em] text-sm transition-colors hover:bg-[#FA6B48] hover:border-[#FA6B48] hover:text-black"
        >
          ariaajipw@gmail.com
        </a>

        <p className="mt-5 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em]">
          Replies within a day — usually faster
        </p>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-24">
        <ContactSection />
      </section>
    </main>
  );
}