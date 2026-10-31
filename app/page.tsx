import React, { type ReactNode } from 'react';
import type { Metadata } from 'next';
import Header from '../components/sections/Header';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Services from '../components/sections/Services';
import Properties from '../components/sections/Properties';
import Testimonials from '../components/sections/Testimonials';
import Enquiry from '../components/sections/Enquiry';
import Footer from '../components/sections/Footer';
import BackToTop from '../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../components/types';

export const metadata: Metadata = {
  title: pages.home.metadata.title,
  description: pages.home.metadata.description,
};

export default function Home() {
  const sectionIdMap: Record<string, string> = {
    hero: 'home',
    about: 'about',
    why_choose_us: 'why-choose-us',
    services: 'services',
    properties: 'properties',
    testimonials: 'testimonials',
    enquiry: 'enquiry',
  };

  const sectionMap: Record<string, ReactNode> = {
    Hero: <Hero data={sections.hero} />,
    About: <About data={sections.about} />,
    WhyChooseUs: <WhyChooseUs data={sections.why_choose_us} />,
    Services: <Services data={sections.services} />,
    Properties: <Properties data={sections.properties} />,
    Testimonials: <Testimonials data={sections.testimonials} />,
    Enquiry: <Enquiry data={sections.enquiry} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-foreground">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pages.home.components.map((block: PageComponent) => {
          const sectionId = sectionIdMap[block.key] || block.key;
          return (
            <div key={block.key} id={sectionId} className="scroll-mt-24">
              {sectionMap[block.component] ?? null}
            </div>
          );
        })}
      </main>
      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}
