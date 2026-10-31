'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  House,
  Handshake,
  KeyRound,
  TrendingUp,
  Building,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import type { ServicesSectionData } from '../../types';
import Eyebrow from '../../ui/Eyebrow';

interface ServicesProps {
  data: ServicesSectionData;
}

const iconMap: Record<string, LucideIcon> = {
  house: House,
  handshake: Handshake,
  key: KeyRound,
  trending: TrendingUp,
  building: Building,
  briefcase: Briefcase,
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function Services({ data }: ServicesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const [gapPx, setGapPx] = useState(24);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Responsive visible cards count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
        setGapPx(20);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
        setGapPx(24);
      } else {
        setVisibleCount(4);
        setGapPx(24);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = data.items.length;
  const maxIndex = Math.max(0, total - visibleCount);

  // Adjust currentIndex if window resized and currentIndex > maxIndex
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay effect
  useEffect(() => {
    if (maxIndex <= 0 || isPaused) return;
    const interval = setInterval(() => {
      next();
    }, 4000);
    return () => clearInterval(interval);
  }, [maxIndex, isPaused, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;
    if (diff > 50) {
      next();
      setTouchStart(null);
    } else if (diff < -50) {
      prev();
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
    setIsPaused(false);
  };

  return (
    <section id="services" className="relative w-full bg-lavender/60 py-14 sm:py-20 overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-primary/[0.07] blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        {/* Centered heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <Eyebrow text={data.eyebrow} align="center" />
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl leading-[1.12] tracking-tight text-primary-dark">
            <span className="block font-light">{data.title_regular}</span>
            <span className="block font-semibold text-primary-gradient">{data.title_highlight}</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">{data.subtitle}</p>
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Overflow wrapper */}
          <div className="overflow-hidden py-4 -my-4 px-1 -mx-1">
            <div
              className="flex"
              style={{
                gap: `${gapPx}px`,
                transform: `translateX(calc(-${currentIndex} * (100% + ${gapPx}px) / ${visibleCount}))`,
                transition: 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            >
              {data.items.map((item) => {
                const Icon = iconMap[item.icon] ?? House;
                return (
                  <article
                    key={item.id}
                    style={{
                      width: `calc((100% - ${(visibleCount - 1) * gapPx}px) / ${visibleCount})`,
                      flexShrink: 0,
                    }}
                    className="group relative flex flex-col rounded-none border border-primary/10 bg-white p-6 sm:p-7 shadow-[0_10px_30px_-20px_rgba(27,20,96,0.35)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/25 hover:shadow-[0_30px_60px_-25px_rgba(27,20,96,0.45)] overflow-hidden"
                  >
                    {/* Fill sweep on hover */}
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />

                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-lavender text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:rotate-[-6deg] group-hover:scale-110">
                      <Icon className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl font-semibold leading-snug text-primary-dark mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted flex-1">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Controls: Dots + Arrows (displayed when items exceed visible count) */}
          {maxIndex > 0 && (
            <div className="mt-8 sm:mt-10 flex items-center justify-between">
              {/* Pagination Dots */}
              <div className="flex items-center gap-2">
                {Array.from({ length: maxIndex + 1 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                      i === currentIndex
                        ? 'w-7 bg-primary'
                        : 'w-2 bg-primary/25 hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous service"
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-primary/25 bg-white text-primary-dark shadow-sm transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next service"
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-primary/25 bg-white text-primary-dark shadow-sm transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white cursor-pointer active:scale-95"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={2} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
