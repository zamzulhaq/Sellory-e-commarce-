"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Banner } from "@/types";

interface BannerCarouselProps {
  banners: Banner[];
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex((index + banners.length) % banners.length);
      setTimeout(() => setIsAnimating(false), 400);
    },
    [isAnimating, banners.length]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);

  useEffect(() => {
    intervalRef.current = setInterval(goNext, 4500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [goNext]);

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goNext, 4500);
  };

  if (!banners.length) return null;

  const banner = banners[currentIndex];

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-md group">
      {/* Banner image */}
      <div
        className={`relative h-44 md:h-64 lg:h-72 bg-gradient-to-r ${banner.bgColor} transition-all duration-500`}
      >
        <img
          src={banner.image}
          alt={banner.title}
          className="w-full h-full object-cover mix-blend-overlay opacity-60"
        />
        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
          <div
            key={currentIndex}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <h2 className="text-white font-black text-2xl md:text-4xl lg:text-5xl drop-shadow-md mb-2">
              {banner.title}
            </h2>
            {banner.subtitle && (
              <p className="text-white/90 text-sm md:text-base drop-shadow mb-4">
                {banner.subtitle}
              </p>
            )}
            <Link
              href={banner.link}
              className="inline-block bg-white text-gray-900 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors shadow-md"
            >
              Lihat Promo
            </Link>
          </div>
        </div>
      </div>

      {/* Prev/Next buttons */}
      <button
        onClick={() => { goPrev(); resetInterval(); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous"
      >
        <ChevronLeft size={18} className="text-gray-700" />
      </button>
      <button
        onClick={() => { goNext(); resetInterval(); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Next"
      >
        <ChevronRight size={18} className="text-gray-700" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => { goTo(i); resetInterval(); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === currentIndex ? "bg-white w-6" : "bg-white/50 w-1.5"
            }`}
            aria-label={`Go to banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
