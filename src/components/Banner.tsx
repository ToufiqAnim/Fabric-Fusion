"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "WOMEN DNA SS25 COLLECTION",
      description:
        "Elegance and structure converge in the refined details and the hues of rose quartz.",
      image:
        "https://dolcegabbana-cdn.thron.com/delivery/public/image/dolcegabbana/742b4305-a024-4b2c-9555-c81fe78e98bf/8nsjnz/std/1100x1375/dna-ss25-women-desk?format=auto",
      link: "/women",
    },
    {
      id: 2,
      title: "MEN DNA SS25 COLLECTION",
      description:
        "A versatile wardrobe, defined by modern volumes and silhouettes, embodying a constantly evolving style.",
      image:
        "https://dolcegabbana-cdn.thron.com/delivery/public/image/dolcegabbana/2ffd86f1-c191-46e9-bf4f-2fc9cd0b7405/sdgowj/std/1100x1375/dna-ss25-men-desk?format=auto",
      link: "/list?cat=men",
    },
  ];

  return (
    <div className="relative w-full min-h-[85vh] md:min-h-screen">
      {/* Desktop Grid Layout */}
      <div className="hidden md:grid grid-cols-2 min-h-[85vh] md:min-h-[120vh]">
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              style={{ objectFit: "cover" }}
              className="h-full w-full"
              priority
            />
            {/* Overlay for Better Readability */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Text Content (Moved Up) */}
            <div className="absolute bottom-16 left-0 w-full text-center px-6">
              <h2 className="text-xl font-semibold text-white">
                {slide.title}
              </h2>
              <p className="text-sm text-gray-200 mt-2">{slide.description}</p>
              <Link
                href={slide.link}
                className="inline-block mt-4 text-white px-6 py-2 text-sm uppercase tracking-wide bg-black/50 hover:bg-black transition"
              >
                Discover More
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="md:hidden min-h-[85vh]">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative min-h-[85vh]">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  layout="fill"
                  objectFit="cover"
                  className="h-full w-full"
                  priority
                />
                {/* Overlay for Mobile */}
                <div className="absolute inset-0 bg-black/30"></div>

                {/* Text Content (Moved Up) */}
                <div className="absolute bottom-12 left-0 w-full text-center px-6">
                  <h2 className="text-lg font-semibold text-white">
                    {slide.title}
                  </h2>
                  <p className="text-sm text-gray-200 mt-2">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.link}
                    className="inline-block mt-4 text-white px-6 py-2 text-sm uppercase tracking-wide bg-black/50 hover:bg-black transition"
                  >
                    Discover More
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
