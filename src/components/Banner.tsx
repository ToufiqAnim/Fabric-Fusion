// components/Slider.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Spring Refresh",
    description: "Revitalize your wardrobe",
    accentColor: "from-green-500 to-teal-500",
    discount: "30% OFF",
    buttonText: "View Latest",
    url: "/",
    img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 2,
    title: "Summer Collection 2025",
    description: "Discover the hottest trends",
    accentColor: "from-orange-500 to-pink-500",
    discount: "50% OFF",
    buttonText: "Shop Collection",
    url: "/",
    img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: 3,
    title: "Winter Essentials",
    description: "Stay warm in style",
    accentColor: "from-blue-500 to-purple-500",
    discount: "40% OFF",
    buttonText: "Explore Now",
    url: "/",
    img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative h-[calc(100vh-80px)] w-full overflow-hidden bg-gray-50">
      <div
        className="flex h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="min-w-full h-full relative">
            {/* Background image for mobile */}
            <div className="absolute inset-0 lg:hidden">
              <div className="relative h-full w-full">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
              </div>
            </div>

            {/* Content grid */}
            <div className="relative h-full w-full grid grid-cols-1 lg:grid-cols-2 items-center">
              {/* Left content section */}
              <div className="relative z-10 flex items-center justify-center p-6 lg:p-12">
                <div className="text-center lg:text-left">
                  <p className="text-sm md:text-base uppercase tracking-wider text-gray-600 mb-2">
                    {slide.description}
                  </p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                    {slide.title}
                  </h2>
                  <div
                    className={`inline-block bg-gradient-to-r ${slide.accentColor} bg-clip-text text-transparent text-4xl md:text-5xl lg:text-6xl font-black mb-6`}
                  >
                    {slide.discount}
                  </div>
                  <div className="mt-8">
                    <Link href={slide.url}>
                      <button
                        className={`bg-gradient-to-r ${slide.accentColor} text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold hover:opacity-90 transition-opacity text-sm md:text-base`}
                      >
                        {slide.buttonText}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right image section */}
              <div className="hidden lg:block h-full p-12">
                <div className="relative h-full w-full rounded-2xl overflow-hidden">
                  <Image
                    src={slide.img}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${slide.accentColor} opacity-10`}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsAutoPlaying(false);
            }}
            className={`h-2 rounded-full transition-all ${
              currentSlide === index ? "w-8 bg-gray-800" : "w-2 bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
