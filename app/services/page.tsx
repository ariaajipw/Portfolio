import Link from "next/link";

const services = [
  {
    title: "Frontend Web Development",
    description:
      "React, Next.js & Tailwind CSS — fast, responsive interfaces built with clean, maintainable code.",
  },
  {
    title: "E-commerce Builds",
    description:
      "Online stores from landing page to checkout, designed for a smooth buying experience.",
  },
  {
    title: "Design to Code",
    description:
      "Design files translated into pixel-consistent, accessible, interactive UI.",
  },
  {
    title: "Performance & SEO",
    description:
      "Core Web Vitals, meta & Open Graph tags — polish that makes people find you and stay.",
  },
];

export default function ServicesPage() {
  return (
    <main className="container mx-auto min-h-dvh px-6 pt-32 pb-24">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center">
        Services
      </h1>
      <p className="max-w-2xl mx-auto text-center text-sm sm:text-lg mt-4 mb-14 text-gray-600 dark:text-gray-300">
        Practical help across the front-end — from a quick landing page to a
        full product build.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {services.map((service) => (
          <div
            key={service.title}
            className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-[#FA6B48] transition-colors"
          >
            <h2 className="text-xl font-bold mb-2 text-[#FA6B48]">
              {service.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center mt-14">
        <Link
          href="/contact"
          className="inline-block border border-black dark:border-white p-3 rounded-full bg-[#FA6B48] hover:bg-black dark:hover:bg-white text-black hover:text-[#FA6B48] dark:hover:text-black transition-colors"
        >
          Let&apos;s Collaborate
        </Link>
      </div>
    </main>
  );
}
