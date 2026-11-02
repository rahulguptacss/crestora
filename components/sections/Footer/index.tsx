'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import type { FooterData, LinkType } from '../../types';
import SocialIcon from '../../ui/SocialIcon';

interface FooterProps {
  data: FooterData;
}

const contactIcon = { 'map-pin': MapPin, map: MapPin, phone: Phone, mail: Mail } as const;
const ease = [0.22, 1, 0.36, 1] as const;

/** Column heading with the gold underline bar */
function ColumnTitle({ text }: { text: string }) {
  return (
    <div className="mb-4 sm:mb-5">
      <h3 className="font-heading text-lg sm:text-xl font-semibold text-white">{text}</h3>
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease }}
        className="mt-2 block h-[2px] w-8 origin-left rounded-full bg-primary"
      />
    </div>
  );
}

export default function Footer({ data }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <footer id="contact" className="relative w-full overflow-hidden bg-[#0b1626] text-white">
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, ease }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-0 py-10 sm:py-14"
        >
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4 lg:pr-8 lg:border-r border-white/10">
            <Link
              href="#home"
              onClick={(e) => handleLinkClick(e, '#home')}
              className="relative block w-56 h-[56px] sm:w-60 sm:h-[62px] mb-4"
              aria-label={data.logo_text}
            >
              <Image src={data.logo} alt={data.logo_text} fill quality={90} sizes="256px" className="object-contain object-left" />
            </Link>
            <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#9eabc0] max-w-sm">{data.description}</p>
          </div>

          {/* Quick Navigation - 2 columns layout */}
          <div className="sm:col-span-1 lg:col-span-4 lg:px-8 lg:border-r border-white/10">
            <ColumnTitle text={data.pages_title} />
            <ul className="grid grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-2.5 sm:gap-y-3">
              {data.pages_links.map((link: LinkType) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="group inline-flex items-center gap-1 text-[13.5px] sm:text-[14px] text-white/90 transition-colors duration-300 hover:text-primary-light"
                  >
                    <span>{link.name}</span>
                    <ChevronRight
                      className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 text-primary"
                      strokeWidth={2}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="sm:col-span-1 lg:col-span-4 lg:pl-8">
            <ColumnTitle text={data.contact_title} />
            <ul className="space-y-4 sm:space-y-4.5">
              {data.contact_items.map((item) => {
                const Icon = contactIcon[item.icon as keyof typeof contactIcon] ?? MapPin;
                const content = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-white/5 text-primary transition-colors duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-dark">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0">
                      {item.label && <span className="block text-[13.5px] font-medium text-white">{item.label}</span>}
                      <span className="mt-0.5 block whitespace-pre-line text-xs sm:text-[13px] leading-relaxed text-[#9eabc0] transition-colors duration-300 group-hover:text-white break-words">
                        {item.text}
                      </span>
                    </span>
                  </>
                );
                return (
                  <li key={item.text}>
                    {item.href ? (
                      <a href={item.href} className="group flex items-start gap-3.5">
                        {content}
                      </a>
                    ) : (
                      <div className="group flex items-start gap-3.5">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-4 sm:py-5 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs sm:text-[13px] text-white/80">{data.copyright}</p>
          <div className="flex items-center gap-3 sm:mr-4">
            {data.socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.aria_label}
                className="flex h-9 w-9 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/30 text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-dark"
              >
                <SocialIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
