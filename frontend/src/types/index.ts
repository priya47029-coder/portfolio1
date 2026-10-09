// Frontend TypeScript definitions for Priya P's Full-Stack Dynamic Portfolio CMS

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: AdminUser;
}

export interface HomeData {
  _id?: string;
  greeting: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  profileImage: string;
  resumeUrl: string;
  availabilityText: string;
  location: string;
  collegeText: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  tertiaryButtonText: string;
  tertiaryButtonLink: string;
  techPills: string[];
  updatedAt?: string;
}

export interface AboutCard {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
  gradient: string;
  order: number;
}

export interface FocusPoint {
  _id?: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutData {
  _id?: string;
  badge: string;
  heading: string;
  subheading: string;
  bioParagraph1: string;
  bioParagraph2: string;
  profileImage: string;
  careerInterests: string[];
  location: string;
  degree: string;
  languages: string;
  focusTitle: string;
  focusDescription: string;
  focusPoints: FocusPoint[];
  cards: AboutCard[];
  updatedAt?: string;
}

export interface Skill {
  _id: string;
  name: string;
  category: 'UI/UX' | 'Programming' | 'Development' | 'Tools' | string;
  level: number;
  icon: string;
  description?: string;
  order?: number;
  createdAt?: string;
}

export interface Project {
  _id: string;
  title: string;
  shortDescription?: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  features?: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  startDate?: string;
  endDate?: string;
  featured?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  duration: string;
  startYear?: string;
  endYear?: string;
  location?: string;
  grade?: string;
  description?: string;
  image?: string;
  highlights?: string[];
  order?: number;
  createdAt?: string;
}

export interface Certification {
  _id: string;
  name: string;
  organization: string;
  date: string;
  description?: string;
  image?: string;
  certificatePdf?: string;
  credentialUrl?: string;
  skillsLearned?: string[];
  order?: number;
  createdAt?: string;
}

export interface Experience {
  _id: string;
  position: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies?: string[];
  companyLogo?: string;
  order?: number;
  createdAt?: string;
}

export interface ContactInfo {
  _id?: string;
  heading: string;
  description: string;
  email: string;
  phone?: string;
  location: string;
  college: string;
  responseTimeNote: string;
  linkedin: string;
  github: string;
  figma: string;
  instagram?: string;
  twitter?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt?: string;
}

export interface NavbarItem {
  _id?: string;
  name: string;
  href: string;
  visible: boolean;
  order: number;
}

export interface NavbarData {
  _id?: string;
  brandName: string;
  brandHighlight: string;
  logoLetter: string;
  logoUrl?: string;
  resumeButtonText: string;
  resumeButtonLink: string;
  items: NavbarItem[];
  updatedAt?: string;
}

export interface FooterData {
  _id?: string;
  brandName: string;
  brandHighlight: string;
  logoLetter: string;
  description: string;
  copyrightText: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  instagram: string;
  updatedAt?: string;
}

export interface SiteSettings {
  _id?: string;
  websiteTitle: string;
  metaDescription: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  defaultTheme: 'dark' | 'light';
  footerText: string;
  updatedAt?: string;
}

export interface DashboardStats {
  totalProjects: number;
  totalSkills: number;
  totalEducation: number;
  totalCertifications: number;
  totalExperience: number;
  totalMessages: number;
  unreadMessages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  count?: number;
}
