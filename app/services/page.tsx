"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Tier = {
  id: string;
  label: string;
  price: string;
  tagline: string;
  timeline: string;
  stack: string;
  includes: string[];
  note?: string;
};

const contacts = {
  phone: "+6282120623351",
};

const links = {
  phone: `https://wa.me/${contacts.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
    "Halo, I am interested in one of the service packages on this page."
  )}`,
};

const tiers: Tier[] = [
  {
    id: "business-website",
    label: "Business Website",
    price: "Price based on project scope",
    tagline:
      "A fast solution for small and medium-sized Enterprises, F&B businesses, and Personal Brands that need a professional online presence.",
    timeline: "3–7 Business Days",
    stack: "Next.js, Tailwind CSS",
    includes: [
      "Custom design (not an instant template)",
      "Fully responsive on mobile and desktop",
      "High-performance loading optimization",
      "WhatsApp / Contact Form",
      "Google Maps integration",
      "Basic domain & hosting setup",
    ],
  },
  {
    id: "shopify-store",
    label: "Shopify Store Setup",
    price: "Price based on project scope",
    tagline:
      "A robust online store for fashion, retail, and physical product brands ready to start selling automatically.",
    timeline: "1–2 Weeks",
    stack: "Shopify Liquid",
    includes: [
      "Shopify account setup and configuration",
      "Theme design customization (Shopify Liquid)",
      "Navigation, product, and collection structure",
      "Local Payment Gateway integration (Midtrans/Xendit)",
      "Automatic shipping cost setup",
      "Optimized cart & checkout pages",
    ],
    note:
      "Monthly Shopify subscription, domain, and third-party app costs are covered by the client.",
  },
];

const addons = [
  {
    name: "Worry-Free Maintenance & Updates",
    price: "Price based on project scope",
  },
  {
    name: "Sales-Driven Copywriting",
    price: "Price based on project scope",
  },
  {
    name: "Additional Page",
    price: "Price based on project scope",
  },
];

const steps = [
  {
    title: "Discovery Call",
    desc: "We dig into your business goals, target audience, and design preferences to ensure we are aligned.",
  },
  {
    title: "Proposal & 50% Deposit",
    desc: "You receive a clear timeline and final pricing. An upfront payment secures your spot in our development schedule.",
  },
  {
    title: "Development & Review",
    desc: "We build your site. You get up to 2 rounds of revisions for design and content to ensure it perfectly matches your vision.",
  },
  {
    title: "Launch & Handover",
    desc: "Final 50% payment, your website goes live, and we hand over all credentials and necessary documentation.",
  },
];

const buttonClass =
  "inline-block rounded-lg bg-[#FA6B48] px-6 py-3 text-sm font-semibold text-black dark:text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FA6B48]";

export default function ServicesPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const context = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".pricing-card");
      const items = gsap.utils.toArray<HTMLElement>(".step-item");

      if (prefersReducedMotion) {
        gsap.set([...cards, ...items], {
          opacity: 1,
          y: 0,
          x: 0,
        });

        return;
      }

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 32,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );
      });

      items.forEach((step, index) => {
        gsap.fromTo(
          step,
          {
            opacity: 0,
            x: -16,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: index * 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 90%",
            },
          }
        );
      });
    }, rootRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className="min-h-screen">
      {/* Hero */}
      <section className="site-container mx-auto px-4 pt-20 pb-5 ">
        <p className="text-sm opacity-50 text-gray-800 dark:text-white">
          Aria Aji — Front-end Developer, Bandung
        </p>

        <h1 className="my-10 max-w-8xl text-4xl font-bold leading-tight sm:text-6xl lg:text-7xl">
          Websites and Online Stores That Are Built to Generate Results, Not
          Just Look Good.
        </h1>

        <p className="mt-5 max-w-md text-xl opacity-85">
          Specializing in high-performance landing pages and Shopify setup for
          brands that want to start selling right away. Built in days, not
          months.
        </p>

        <a
          href={links.phone}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-8 text-lg button inline-flex items-center justify-center p-3 rounded-full text-center bg-[#FA6B48] hover:bg-black dark:hover:bg-white text-black dark:text-white  hover:text-[#FA6B48] ${buttonClass}`}
        >
          Get Started
        </a>
      </section>

      {/* Pricing */}
      <section className="site-container mx-auto px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className="pricing-card rounded-lg bg-black p-7 text-white dark:bg-[#FDFBF7] dark:text-gray-950"
            >
              <h3 className="text-2xl font-semibold">{tier.label}</h3>

              <p className="mt-2 text-md font-semibold text-[#FA6B48]">
                {tier.price}
              </p>

              <p className="mt-3 text-sm opacity-85">{tier.tagline}</p>

              <div className="mt-4 flex gap-4 text-xs opacity-60">
                <span>{tier.timeline}</span>
                <span>{tier.stack}</span>
              </div>

              <ul className="mt-5 space-y-2 text-sm">
                {tier.includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-[#FA6B48]">–</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {tier.note && (
                <p className="mt-5 border-t border-white/20 pt-4 text-xs opacity-60 dark:border-black/20">
                  {tier.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Add-ons */}
      <section className="site-container mx-auto px-8 py-10 ">
        <h2 className="text-2xl font-bold">Additional Services</h2>

        <div className="mt-5 divide-y divide-black/10 border-t border-black/10 dark:divide-white/10 dark:border-white/10 text-gray-900 dark:text-white">
          {addons.map((addon) => (
            <div
              key={addon.name}
              className="flex items-center justify-between py-3 text-sm"
            >
              <span>{addon.name}</span>
              <span className="opacity-80">{addon.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="site-container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold">Work Process</h2>

        <div className="mt-6 space-y-6 text-gray-800 dark:text-white">
          {steps.map((step, index) => (
            <div key={step.title} className="step-item flex gap-4">
              <span className="text-2xl font-bold opacity-50">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <h3 className="font-semibold">{step.title}</h3>

                <p className="mt-1 text-sm opacity-90">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="site-container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold">
          Interested in working together?
        </h2>

        <a
          href={links.phone}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-5 text-lg button inline-flex items-center justify-center p-3 rounded-full text-center bg-[#FA6B48] hover:bg-black dark:hover:bg-white text-black dark:text-white hover:text-[#FA6B48] ${buttonClass}`}
        >
          Chat via WhatsApp
        </a>
      </section>
    </div>
  );
}
