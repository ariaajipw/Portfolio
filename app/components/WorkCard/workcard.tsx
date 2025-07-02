'use client'

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const works = [
  {
    id: 1,
    thumbnail: "https://api.apiflash.com/v1/urltoimage?access_key=80c0ea0b1d364ab98cf8b26d35a0c9b6&url=https%3A%2F%2Fdev.hubton.com%2F&format=jpeg&width=1620&height=1080",
    title: "Hubton",
    subtitle: "Intern as web developer at Hubton Indonesia, focused on front-end side.",
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
   {
    id: 5,
    thumbnail: "https://api.apiflash.com/v1/urltoimage?access_key=80c0ea0b1d364ab98cf8b26d35a0c9b6&url=https%3A%2F%2Fdev.hubton.com%2F&format=jpeg&width=1620&height=1080",
    title: "Lorem, ipsum.",
    subtitle: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 6,
    thumbnail: "https://api.apiflash.com/v1/urltoimage?access_key=80c0ea0b1d364ab98cf8b26d35a0c9b6&url=https%3A%2F%2Fdev.hubton.com%2F&format=jpeg&width=1620&height=1080",
    title: "Lorem, ipsum.",
    subtitle: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
  },
];

const WorkCards: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const isSwipingRef = useRef(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const slideCount = works.length;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fungsi untuk menangani perpindahan slide dengan infinite yang smooth
  const goToSlide = (index: number, withAnimation = true) => {
    if (!withAnimation) {
      setTransitionEnabled(false);
      setCurrentIndex(index);
      
      // Re-enable transition after a short delay
      setTimeout(() => {
        setTransitionEnabled(true);
      }, 50);
    } else {
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => {
    if (currentIndex === slideCount - 1) {
      // Pindah ke slide pertama tanpa animasi
      goToSlide(0, false);
    } else {
      goToSlide(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex === 0) {
      // Pindah ke slide terakhir tanpa animasi
      goToSlide(slideCount - 1, false);
    } else {
      goToSlide(currentIndex - 1);
    }
  };

  // Swipe gesture yang lebih smooth
  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    isSwipingRef.current = true;
    
    // Nonaktifkan transisi selama swipe
    setTransitionEnabled(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwipingRef.current) return;
    
    const touchX = e.touches[0].clientX;
    const diff = touchX - startXRef.current;
    
    // Update posisi slide secara real-time
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(calc(-${currentIndex * 100}% + ${diff}px)`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isSwipingRef.current) return;
    isSwipingRef.current = false;
    
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startXRef.current;
    const absDiff = Math.abs(diff);
    
    // Threshold 20% lebar layar
    const swipeThreshold = window.innerWidth * 0.2;
    
    // Aktifkan kembali transisi
    setTransitionEnabled(true);
    
    if (absDiff > swipeThreshold) {
      if (diff > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    } else {
      // Kembali ke posisi semula jika tidak mencapai threshold
      setCurrentIndex(currentIndex);
    }
  };

  useEffect(() => {
    if (!isMobile) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, [isMobile, currentIndex]);

  return (
    <div className="container mx-auto px-4 pt-15 md:pt-6 w-auto min-h-screen">
      <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mt-1 mb-8 lg:mb-20">Projects & Works</h1>
      
      {/* Desktop View */}
     <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-4 w-fit lg:w-fit">
      {works.slice(0, 4).map((work) => (
      <div
        key={work.id}
        className="rounded-sm overflow-hidden duration-300 grid grid-cols-1 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] mx-[15px] sm:mx-[100px] md:mx-[150px] lg:mx-[0px] bg-black dark:bg-white hover:bg-gray-400 hover:text-white dark:hover:text-black transition-all hover:scale-[1.02]"
      > 
        {/* Bagian Gambar */}
        <div className="relative w-full aspect-video overflow-hidden"> {/* Tambahkan aspect-video */}
          <img
            src={work.thumbnail}
            alt={work.title}
            className="w-full h-fit object-cover"
          />
        </div>
        
        {/* Bagian Teks */}
        <div className="p-4 bg-black dark:bg-white hover:bg-gray-400 hover:text-white dark:hover:text-black max-w-[280px]">
          <h2 className="text-[#FA6B48] text-xl font-bold mb-4">{work.title}</h2>
          <p className="text-white dark:text-gray-900 text-xs sm:text-sm xl:text-base">{work.subtitle}</p>
        </div>
      </div>
      ))}
    </div>

      {/* Mobile/Tablet View - Carousel */}
      <div className="lg:hidden relative overflow-hidden"> 
        <div 
          ref={containerRef}
          className="flex transition-transform duration-300 ease-out touch-pan-y"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: transitionEnabled ? 'transform 0.3s ease-out' : 'none'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          {works.map((work) => (
            <div key={work.id} className="min-w-full px-4 mt-[100px] landscape:mt-7">
              <div className="rounded-lg overflow-hidden bg-black dark:bg-white hover:bg-gray-400 hover:text-white dark:hover:text-black transition-all">
                <div className="grid grid-cols-1 sm:grid-cols-2 relative">
                  <div className="w-full aspect-video overflow-hidden ">
                    <img
                      src={work.thumbnail}
                      alt={work.title}
                      className="w-full object-cover"
                    />
                  </div>
                  <div className="p-4 bg-black dark:bg-white hover:bg-gray-400 hover:text-white dark:hover:text-black relative">
                    <h2 className="text-[#FA6B48] text-xl font-bold mb-4">{work.title}</h2>
                    <p className="text-white dark:text-gray-900 text-xs sm:text-sm lg:text-base">{work.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all z-10"
          aria-label="Previous slide"
        >
          &lt;
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all z-10"
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
      {/* Tombol See All jika ada lebih dari 4 works */}
        {works.length > 4 && (
          <div className="text-center mt-10">
            <Link 
              href="/services"
              className="button border-black dark:border-black p-3 rounded-full content-center place-self-center w-[130px] text-center bg-[#FA6B48] hover:bg-black dark:hover:bg-white text-black hover:text-[#FA6B48] mx-[80px] sm:mx-[225px] md:mx-[280px] lg:mx-[100px] xl:mx-[227px] 2xl:mx-[280px]"
            >
              See All Projects
            </Link>
          </div>
        )}
    </div>
  );
};

export default WorkCards;