"use client";

import React, { useState } from "react";

// Definisikan tipe untuk panel contents
type PanelContent = {
  [key: number]: React.ReactNode;
};

export default function About() {
  const [activePanel, setActivePanel] = useState<number>(0);

  // Data untuk tombol toggle
  const toggleButtons = [
    { id: 0, title: "Bio" },
    { id: 1, title: "Career" },
    { id: 2, title: "Academy" },
    { id: 3, title: "Open Source" },
  ];

  // Konten untuk setiap panel dengan tipe yang didefinisikan
  const panelContents: PanelContent = {
    0: (
      <div className="leading-[170%] lg:leading-[200%] text-md md:text-lg lg:text-2xl xl:max-w-[971px] 2xl:max-w-[1290px]">
        <h3 className="font-bold mb-2"></h3>
        <span className="">
              {" "}
              A front-end developer obsessed with creating digital experiences
              that truly 'click'.
            </span>{" "}
            <span className="font-bold">
              Currently geeking out over React, Next.js, Tailwind CSS, and
              Shopify – learning hands-on through daily projects.
            </span>{" "}
            <span className="">
              My experience is still growing, but my mission is clear: turn code
              into solutions.
            </span>{" "}
            Give me creative challenges, and I'll pour my energy into building
            genuinely useful and enjoyable things.{" "}
            <span className="font-bold">
              I'm here to grow, make an impact, and create work that resonates.
            </span>
      </div>
    ),
    1: (
      <div className="leading-[170%] lg:leading-[200%] text-md md:text-lg lg:text-2xl xl:max-w-[971px] 2xl:max-w-[1290px]">
        <h3 className="font-bold mb-2">Career Experience</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Frontend Developer at Company A (2020-2022)</li>
          <li>Web Developer Intern at Company B (2019-2020)</li>
          <li>Freelance Web Projects (2018-present)</li>
        </ul>
      </div>
    ),
    2: (
      <div className="leading-[170%] lg:leading-[200%] text-md md:text-lg lg:text-2xl xl:max-w-[971px] 2xl:max-w-[1290px]">
        <h3 className="font-bold mb-2">Education</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Bachelor of Computer Science - University X (2016-2020)</li>
          <li>Web Development Bootcamp - Coding Academy</li>
          <li>Advanced React Certification</li>
        </ul>
      </div>
    ),
    3: (
      <div className="leading-[170%] lg:leading-[200%] text-md md:text-lg lg:text-2xl xl:max-w-[971px] 2xl:max-w-[1290px]">
        <h3 className="font-bold mb-2">Open Source Contributions</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Contributed to React Community Projects</li>
          <li>Created Tailwind CSS plugins</li>
          <li>Maintainer of Shopify starter kit</li>
        </ul>
      </div>
    ),
  };

  return (
            <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 items-start px-[20px] md:pt[49px] text-black dark:text-white lg:flex-1-reverse xl:pb-[50px] xl:px-[100px] 2xl:px-[220px] gap-y-[30px] lg:gap-x-[30px] min-h-dvh mb-18">
      <div className="flex col-span-1 h-full justify-center">
        <div className="font-bold text-7xl md:text-8xl lg:text-9xl xl:text-[140px] 2xl:text-[180px] content-center">
          <img
            src="assets/img/ariaaji.jpg"
            alt="ariaaji"
            className="w-full h-full object-cover"
            style={{ width: "200%", height: "50%" }}
          />
        </div>
      </div>

      <div className="flex col-span-1 h-full items-start sm:items-center">
        <div className="w-full">
          {/* <p className="leading-[170%] lg:leading-[200%] text-md md:text-lg lg:text-xl xl:max-w-[971px] 2xl:max-w-[1290px]">
            <span className="font-bold">Bio</span> <br />{" "}
            <span className="">
              {" "}
              A front-end developer obsessed with creating digital experiences
              that truly 'click'.
            </span>{" "}
            <span className="font-bold">
              Currently geeking out over React, Next.js, Tailwind CSS, and
              Shopify – learning hands-on through daily projects.
            </span>{" "}
            <span className="">
              My experience is still growing, but my mission is clear: turn code
              into solutions.
            </span>{" "}
            Give me creative challenges, and I'll pour my energy into building
            genuinely useful and enjoyable things.{" "}
            <span className="font-bold">
              I'm here to grow, make an impact, and create work that resonates.
            </span>
          </p> */}

          {/* Bagian Toggle */}
          <div className="">
            <div className="flex space-x-4 mb-4">
              {toggleButtons.map((button) => (
                <button
                  key={button.id}
                  className={`px-2 py-2 rounded-lg transition-all duration-200 text-md md:text-lg lg:text-2xl ${
                    activePanel === button.id
                      ? "text-gray-700 dark:text-white font-bold underline underline-offset-4"
                      : "text-gray-700 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-600 opacity-30 hover:opacity-100"
                  }`}
                  onClick={() => setActivePanel(button.id)}
                >
                  {button.title}
                </button>
              ))}
            </div>

            {/* Konten yang Berubah berdasarkan Toggle */}
            <div className="toggle-content transition-opacity duration-300">
              {panelContents[activePanel]}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}