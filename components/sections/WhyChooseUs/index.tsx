'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { WhyChooseUsSectionData } from '../../types';

interface WhyChooseUsProps {
  data: WhyChooseUsSectionData;
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function WhyChooseUs({ data }: WhyChooseUsProps) {
  return (
    <section id="why-choose-us" className="relative w-full bg-[#fbf9f5] py-14 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header row: eyebrow | heading | divider + description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Eyebrow with two-tone underline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
            className="lg:col-span-2"
          >
            <p className="text-[14px] font-semibold text-primary uppercase tracking-[0.2em]">{data.eyebrow}</p>
            <div className="relative mt-2.5 h-px w-36 bg-primary/20">
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease }}
                className="absolute left-0 top-1/2 h-[2px] w-12 -translate-y-1/2 origin-left bg-primary"
              />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease }}
            className="lg:col-span-5 lg:col-start-4 font-heading font-semibold text-[34px] leading-[1.08] sm:text-[42px] lg:text-[48px] xl:text-[52px] tracking-tight"
          >
            <span className="text-primary-dark">{data.title_regular}</span>{' '}
            <span className="text-primary">{data.title_highlight}</span>
          </motion.h2>

          {/* Vertical divider + description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="lg:col-span-4 lg:col-start-9 flex self-stretch items-center lg:border-l border-primary/20 lg:pl-10"
          >
            <p className="max-w-[320px] text-[15px] leading-[1.75] text-muted">{data.description}</p>
          </motion.div>
        </div>

        {/* Full-width rule under the header */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease }}
          className="mt-10 sm:mt-12 mb-6 sm:mb-7 h-px w-full origin-left bg-primary/15"
        />

        {/* Body: numbered rows | image */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,48%)_minmax(0,1fr)] gap-8 lg:gap-10 items-stretch">
          <ul className="flex flex-col justify-between">
            {data.items.map((item, idx) => {
              const last = idx === data.items.length - 1;
              return (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease }}
                  className={`group flex flex-1 items-start gap-5 sm:gap-6 py-5 sm:py-6 ${
                    idx === 0 ? 'pt-2 sm:pt-3' : ''
                  } ${last ? 'pb-0' : 'border-b border-primary/10'}`}
                >
                  <span className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-lavender text-[13px] font-bold text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-105 shadow-sm">
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="flex-1">
                    <h3 className="font-heading text-[19px] sm:text-[21px] font-semibold leading-tight text-primary-dark mb-1.5 transition-colors duration-300 group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="max-w-[360px] text-[14px] leading-[1.6] text-muted">{item.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="group relative min-h-[380px] sm:min-h-[480px] w-full overflow-hidden bg-lavender rounded-[4px] shadow-[0_20px_50px_-20px_rgba(11,22,38,0.25)]"
          >
            <motion.div
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease }}
              className="absolute inset-0"
            >
              <Image
                src={data.image}
                alt={data.image_alt}
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
