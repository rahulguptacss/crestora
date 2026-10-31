# CRESTORA – PROPERTIES & INFRASTRUCTURE

A luxury, high-performance onepage web platform engineered for a visionary property development and civic infrastructure conglomerate. Built with **Next.js 16 (App Router + Turbopack)**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**.

---

## 🏛️ Brand & Vision

**Crestora** pioneers iconic architectural skyscrapers, sustainable master-planned communities, and smart civic infrastructure engineered for enduring generational value.

- **Theme Palette:**
  - Deep Midnight Navy: `#0b1626`
  - Amber Gold: `#c88634` / `#df9a48`
  - Warm Architectural Off-White: `#fbf9f5` / `#faf8f5`

---

## ✨ Features

- **100% Centralized Data Architecture:** Every heading, paragraph, button, menu, image, video, metric, and contact item is strictly loaded from `components/data/data.json` with zero hardcoding.
- **Onepage Architecture with Smooth Navigation:** Seamless hash-scrolling across all sections (`#home`, `#about`, `#why-choose-us`, `#services`, `#properties`, `#testimonials`, `#enquiry`).
- **Interactive Mobile Header Drawer:** Touch-draggable mobile navigation drawer with swipe-down dismiss gestures and dynamic links.
- **Hero Video Banner:** Supports high-definition autoplay background video (`/hero/banner.mp4`) with smooth parallax and 8K poster image fallback.
- **Dynamic Services Carousel:** Displays 4 service cards on desktop and auto-slides smoothly when more items exist, with pause-on-hover, indicator dots, navigation arrows, and touch-swipe.
- **Signature Properties Showcase:** Interactive portfolio slider with categories, direct inquiry buttons, and responsive grid pagination.
- **Customer Testimonials:** Autoplay review slider featuring verified client profiles and project imagery.
- **Contact & Consultation:** Institutional consultation request form with custom styled dropdown selectors and validation.
- **Optimized Media Assets:** 8K photorealistic imagery compressed with bicubic resampling and high-efficiency WebP/MozJPEG encoding for instant loading speeds.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16.4.2 (App Router & Turbopack)
- **UI Library:** React 19.3.0
- **Styling:** Tailwind CSS v4
- **Motion:** Framer Motion
- **Icons:** Lucide React
- **Typography:** Outfit, Inter & Cormorant Garamond

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ or 20+
- npm or yarn

### Installation

```bash
git clone https://github.com/rahulguptacss/crestora.git
cd crestora
npm install
```

### Running Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
crestora/
├── app/
│   ├── globals.css         # Tailwind v4 configuration & theme tokens
│   ├── layout.tsx          # Root layout with dynamic font injection
│   ├── not-found.tsx       # Branded 404 error page
│   └── page.tsx            # Single-page layout assembled from data.json
├── components/
│   ├── data/
│   │   └── data.json       # 100% Single source of truth for all content
│   ├── sections/
│   │   ├── Header/         # Fixed desktop nav & draggable mobile drawer
│   │   ├── Hero/           # Video/Image banner with smooth parallax
│   │   ├── About/          # Corporate narrative & live metric counters
│   │   ├── WhyChooseUs/    # Numbered value pillars & showcase photography
│   │   ├── Services/       # Responsive auto-sliding capability cards
│   │   ├── Properties/     # Landmark developments slider
│   │   ├── Testimonials/   # Institutional partner review carousel
│   │   ├── Enquiry/        # Advisory consultation request form
│   │   └── Footer/         # 2-column quick navigation & contact info
│   ├── types/              # Fully typed TypeScript interfaces
│   └── ui/                 # Reusable buttons, selects, and counters
└── public/                 # Compressed WebP logos, images, and video assets
```

---

## 📄 License

Copyright © 2026 CRESTORA – PROPERTIES & INFRASTRUCTURE. All rights reserved. Powered by Lestow.
