'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeaderData, LinkType } from '../../types';
import PrimaryButton from '../../ui/PrimaryButton';

interface HeaderProps {
  data: HeaderData;
}

export default function Header({ data }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = ['home', 'about', 'why-choose-us', 'services', 'properties', 'testimonials', 'enquiry'];
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href.startsWith('#')) {
      return activeSection === href.replace('#', '');
    }
    return false;
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setIsOpen(false);
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[0_4px_24px_rgba(11,22,38,0.06)] py-2 sm:py-2.5 border-b border-primary/10'
            : 'bg-white py-3 sm:py-3.5 border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* Logo with link to top */}
          <Link
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            aria-label={`${data.logo_text} ${data.logo_subtext}`}
            className="shrink-0 flex items-center"
          >
            <div
              className={`relative transition-all duration-300 ${
                isScrolled
                  ? 'w-40 h-10 sm:w-48 sm:h-12'
                  : 'w-48 h-12 sm:w-56 sm:h-14 lg:w-52 lg:h-[56px] xl:w-60 xl:h-[62px]'
              }`}
            >
              <Image
                src={data.logo}
                alt={`${data.logo_text} ${data.logo_subtext}`}
                fill
                priority
                sizes="240px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main navigation">
            {data.links.map((link: LinkType) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`group/nav relative px-3.5 py-2 text-[14px] xl:text-[14.5px] font-medium transition-colors duration-200 ${
                    active ? 'text-primary font-semibold' : 'text-foreground/80 hover:text-primary'
                  }`}
                >
                  <span>{link.name}</span>
                  {active ? (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full bg-primary"
                    />
                  ) : (
                    <span className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full bg-primary scale-x-0 transition-transform duration-300 ease-out origin-center group-hover/nav:scale-x-100" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {data.button_text && data.button_link && (
              <PrimaryButton
                href={data.button_link}
                text={data.button_text}
                onClick={() => { setIsOpen(false); const el = document.getElementById(data.button_link!.replace("#", "")); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                className="hidden sm:inline-flex px-5 py-2.5 text-xs font-semibold tracking-wider uppercase"
              />
            )}

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={data.menu_aria_label}
              aria-expanded={isOpen}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:bg-lavender cursor-pointer"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile touch-draggable drawer (swipe downwards to dismiss) */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
                className="lg:hidden fixed inset-0 top-[60px] sm:top-[70px] bg-navy/40 backdrop-blur-[2px] z-40"
              />

              {/* Draggable panel from top */}
              <motion.div
                key="mobile-drawer"
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.7 }}
                onDragEnd={(_e, info) => {
                  if (info.offset.y > 60 || info.velocity.y > 250) {
                    setIsOpen(false);
                  }
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="lg:hidden absolute left-0 right-0 top-full z-50 overflow-hidden bg-white border-b border-primary/15 shadow-2xl rounded-b-2xl cursor-grab active:cursor-grabbing select-none"
              >
                {/* Drag Handle Indicator */}
                <div className="flex flex-col items-center justify-center pt-2.5 pb-1 select-none">
                  <div className="w-12 h-1.5 rounded-full bg-primary/40" />
                  {data.drag_hint && (
                    <span className="text-[9.5px] tracking-[0.16em] uppercase text-muted mt-1 font-semibold">
                      {data.drag_hint}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1 px-6 py-4 max-h-[calc(100vh-140px)] overflow-y-auto">
                  {data.links.map((link: LinkType) => {
                    const active = isActive(link.href);
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className={`text-[14px] font-semibold tracking-wide uppercase py-3 transition-colors ${
                          active
                            ? 'text-primary font-bold border-l-2 border-primary pl-3'
                            : 'text-foreground/80 hover:text-primary'
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}

                  {data.button_text && data.button_link && (
                    <div className="pt-3 pb-2 border-t border-primary/10 mt-2">
                      <PrimaryButton
                        href={data.button_link}
                        text={data.button_text}
                        onClick={() => { setIsOpen(false); const el = document.getElementById(data.button_link!.replace("#", "")); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
                        className="w-full text-center justify-center"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer so fixed header doesn't overlap hero content */}
      <div aria-hidden="true" className="h-[68px] sm:h-[78px] lg:h-[84px]" />
    </>
  );
}
