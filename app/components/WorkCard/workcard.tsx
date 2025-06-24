'use client'

import React, { useState, useEffect } from "react";

const works = [
  {
    id: 1,
    thumbnail: "https://api.apiflash.com/v1/urltoimage?access_key=80c0ea0b1d364ab98cf8b26d35a0c9b6&url=https%3A%2F%2Fdev.hubton.com%2F&format=jpeg&width=1620&height=1080",
    title: "Hubton",
    subtitle: "Internship as web developer at Hubton Indonesia, i'm focused on front-end side as a developer.",
  },
  {
    id: 2,
    thumbnail: "https://api.apiflash.com/v1/urltoimage?access_key=80c0ea0b1d364ab98cf8b26d35a0c9b6&url=https%3A%2F%2Fdev.hubton.com%2F&format=jpeg&width=1620&height=1080",
    title: "Sajua Brewery",
    subtitle: "Build e-commerce website.",
  },
  {
    id: 3,
    thumbnail: "https://api.apiflash.com/v1/urltoimage?access_key=80c0ea0b1d364ab98cf8b26d35a0c9b6&url=https%3A%2F%2Fdev.hubton.com%2F&format=jpeg&width=1620&height=1080",
    title: "Lorem, ipsum.",
    subtitle: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 4,
    thumbnail: "https://api.apiflash.com/v1/urltoimage?access_key=80c0ea0b1d364ab98cf8b26d35a0c9b6&url=https%3A%2F%2Fdev.hubton.com%2F&format=jpeg&width=1620&height=1080",
    title: "Lorem, ipsum.",
    subtitle: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  },
];

const WorkCards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint in Tailwind
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === works.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? works.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-rotate slides for mobile view
  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 10000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isMobile, currentIndex]);

  return (
    <div className="container mx-auto px-4 py-8 w-auto min-h-screen">
      <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mt-10 mb-8 lg:mb-12">Projects and Works</h1>
      
      {/* Desktop View (lg) - Grid Layout */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-6 w-fit lg:w-full">
        {works.map((work) => (
          <div
            key={work.id}
            className="rounded-lg overflow-hidden duration-300 grid-cols-1 h-[200px] md:h-[170px] lg:grid lg:grid-cols-2 mx-[15px] sm:mx-[100px] md:mx-[150px] lg:mx-[0px] bg-black dark:bg-white hover:bg-gray-400 hover:text-white dark:hover:text-black transition-all hover:scale-[1.02]"
          >
             <div className="relative w-full h-full">
              <img
                src={work.thumbnail}
                alt={work.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-4 grid-cols-2 bg-black dark:bg-white hover:bg-gray-400 hover:text-white dark:hover:text-black">
              <h2 className="text-[#FA6B48] text-xl font-bold mb-4">{work.title}</h2>
              <p className="text-white dark:text-gray-900 text-xs sm:text-sm xl:text-base ">{work.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile/Tablet View - Carousel */}
      <div className="lg:hidden relative overflow-hidden ">
        <div className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {works.map((work) => (
            <div key={work.id} className="min-w-full px-4 mt-[100px] landscape:mt-7">
              <div className="rounded-lg overflow-hidden bg-black dark:bg-white hover:bg-gray-400 hover:text-white dark:hover:text-black transition-all">
                <div className="grid grid-cols-1">
                 <div className="w-full overflow-hidden">
                  <img
                    src={work.thumbnail}
                    alt={work.title}
                    className="w-full h-full object-cover"
                  />
                  </div>
                  <div className="p-4 bg-black dark:bg-white hover:bg-gray-400 hover:text-white dark:hover:text-black relative -translate-y-[32px] landscape:-translate-y-[80px]">
                    <h2 className="text-[#FA6B48] text-xl font-bold mb-4">{work.title}</h2>
                    <p className="text-white dark:text-gray-900 text-xs sm:text-sm xl:text-base">{work.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
          aria-label="Previous slide"
        >
          &lt;
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
          aria-label="Next slide"
        >
          &gt;
        </button>

        {/* Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {works.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full transition-all ${currentIndex === index ? 'bg-[#FA6B48] w-6' : 'bg-gray-400'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkCards;