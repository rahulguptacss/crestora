import data from '../data/data.json';

export interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

export type LinkType = NavItem;

export interface HeaderData {
  logo: string;
  logo_text: string;
  logo_subtext: string;
  drag_hint?: string;
  links: LinkType[];
  button_text?: string;
  button_link?: string;
  menu_aria_label: string;
  close_aria_label: string;
}

export interface FooterContactItem {
  icon: string;
  label?: string;
  text: string;
  href?: string;
}

export interface FooterSocialItem {
  name: string;
  href: string;
  icon: string;
  aria_label: string;
}

export interface FooterData {
  logo: string;
  logo_text: string;
  logo_subtext?: string;
  description: string;
  pages_title: string;
  pages_links: LinkType[];
  properties_title?: string;
  properties_links?: LinkType[];
  contact_title: string;
  contact_items: FooterContactItem[];
  copyright: string;
  socials: FooterSocialItem[];
}

export interface BackToTopData {
  aria_label: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface HeroSectionData {
  eyebrow: string;
  title_line1: string;
  title_line2: string;
  description: string;
  cta_text: string;
  cta_link: string;
  secondary_cta_text?: string;
  secondary_cta_link?: string;
  video?: string;
  image: string;
  image_alt: string;
  stats?: StatItem[];
}

export interface AboutSectionData {
  eyebrow: string;
  side_text: string;
  title_regular: string;
  title_highlight: string;
  description_paragraphs: string[];
  button_text: string;
  button_link: string;
  image_main: string;
  image_main_alt: string;
  image_secondary: string;
  image_secondary_alt: string;
  stats: StatItem[];
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
}

export interface WhyChooseUsSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  video?: string;
  image: string;
  image_alt: string;
  items: WhyChooseUsItem[];
}

export interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
}

export interface ServicesSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  subtitle: string;
  read_more_text?: string;
  items: ServiceItem[];
}

export interface PropertyItem {
  id: string;
  category: string;
  title: string;
  video?: string;
  image: string;
  alt: string;
  href: string;
}

export interface PaginationLabels {
  label: string;
  prev_aria_label: string;
  next_aria_label: string;
  page_aria_label: string;
  showing_text?: string;
}

export interface PropertiesSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  button_text: string;
  button_link: string;
  view_aria_label?: string;
  slides_aria_label?: string;
  slide_aria_label?: string;
  homepage_count?: number;
  per_page?: number;
  pagination?: PaginationLabels;
  items: PropertyItem[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  video?: string;
  image: string;
  image_alt: string;
}

export interface TestimonialsSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  intro: string;
  slides_aria_label?: string;
  testimonial_aria_label?: string;
  rating_aria_label?: string;
  prev_aria_label: string;
  next_aria_label: string;
  items: TestimonialItem[];
}

export interface EnquiryFeature {
  icon: string;
  title: string;
  description: string;
}

export interface EnquiryFormFields {
  name_label: string;
  name_placeholder: string;
  email_label: string;
  email_placeholder: string;
  phone_label: string;
  phone_placeholder: string;
  property_type_label: string;
  property_type_placeholder: string;
  property_type_options: string[];
  location_label: string;
  location_placeholder: string;
  budget_label: string;
  budget_placeholder: string;
  budget_options: string[];
  message_label: string;
  message_placeholder: string;
  submit_text: string;
  success_message?: string;
}

export interface EnquirySectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  description: string;
  video?: string;
  image: string;
  image_alt: string;
  features: EnquiryFeature[];
  form: EnquiryFormFields;
}

export interface PageComponent {
  key: string;
  component: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  metadata: {
    title: string;
    description: string;
  };
  components: PageComponent[];
}

export interface NotFoundData {
  metadata: {
    title: string;
    description: string;
  };
  code: string;
  badge: string;
  title: string;
  description: string;
  back_home: {
    text: string;
    href: string;
  };
}

export interface SiteSections {
  hero: HeroSectionData;
  about: AboutSectionData;
  why_choose_us: WhyChooseUsSectionData;
  services: ServicesSectionData;
  properties: PropertiesSectionData;
  testimonials: TestimonialsSectionData;
  enquiry: EnquirySectionData;
}

export interface SitePages {
  home: PageMeta;
  not_found: NotFoundData;
}

export interface SiteData {
  common: {
    Header: HeaderData;
    Footer: FooterData;
    BackToTop: BackToTopData;
  };
  pages: SitePages;
  sections: SiteSections;
}

export const siteJson: SiteData = data as unknown as SiteData;
export const common = siteJson.common;
export const pages = siteJson.pages;
export const sections = siteJson.sections;
