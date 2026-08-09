import Link from "next/link";

const services = [
  {
    no: "01",
    title: "Frontend Web Development",
    description:
      "React, Next.js & Tailwind CSS — responsive, fast interfaces built with clean and maintainable code.",
  },
  {
    no: "02",
    title: "E-commerce Builds",
    description:
      "Online storefronts from landing page to checkout — designed for a smooth buying experience.",
  },
  {
    no: "03",
    title: "Design to Code",
    description:
      "Design files translated into pixel-consistent, accessible, interactive UI.",
  },
  {
    no: "04",
    title: "Performance & SEO",
    description:
      "Core Web Vitals, meta & Open Graph tags — polish that makes people find you and stay.",
  },
];

export default function ServicesPage() {
  return (
    <main className="overflow-x-hidden">
      <header className="px-6 pt-28 sm:pt-36">
        <p className="text-xs uppercase tracking-[0.35em] text-[#FA6B48] text-center mb-6">
          What I can do
        </p>
        <h1 className="text-center font-bold uppercase leading-none tracking-tight text-[clamp(3.5rem,11vw,11rem)] whitespace-nowrap">
          Services
        </h1>
        <div className="mx-auto mt-8 h-px w-full max-w-[min(60rem,80vw)] bg-gray-300 dark:bg-gray-700" />
      </header>

      <section className="mx-auto max-w-4xl px-6 py-14">
        <p className="mx-auto max-w-2xl text-center text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          Practical help across the front-end — from a quick landing page to a
          full product build. No bloated tooling, just focused work that ships.
        </p>

        <ul className="mt-12 border-t border-b border-gray-300 dark:border-gray-700 divide-y divide-gray-300 dark:divide-gray-700">
          {services.map((service) => (
            <li
              key={service.no}
              className="group flex items-start gap-4 sm:gap-8 py-7 sm:py-9"
            >
              <span className="pt-1 text-sm text-gray-400 dark:text-gray-500">
                {service.no}
              </span>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold leading-tight transition-colors group-hover:text-[#FA6B48]">
                  {service.title}
                </h2>
                <p className="mt-2 max-w-xl text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-block border-2 border-gray-900 dark:border-gray-100 px-8 py-3 font-bold uppercase tracking-[0.2em] text-sm transition-colors hover:bg-[#FA6B48] hover:border-[#FA6B48] hover:text-black"
          >
            Start a Project
          </Link>
        </div>
      </section>
    </main>
  );
}