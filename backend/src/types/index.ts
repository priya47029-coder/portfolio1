import { Document } from 'mongoose';

export interface IAdminUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IHome extends Document {
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
  updatedAt: Date;
}

export interface IAboutCard {
  _id?: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
  gradient: string;
  order: number;
}

export interface IAbout extends Document {
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
  focusPoints: Array<{ title: string; description: string; icon: string }>;
  cards: IAboutCard[];
  updatedAt: Date;
}

export interface ISkill extends Document {
  name: string;
  category: 'UI/UX' | 'Programming' | 'Development' | 'Tools' | string;
  level: number;
  icon: string;
  description?: string;
  order?: number;
  createdAt: Date;
}

export interface IProject extends Document {
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
  createdAt: Date;
}

export interface IEducation extends Document {
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
  createdAt: Date;
}

export interface ICertification extends Document {
  name: string;
  organization: string;
  date: string;
  description?: string;
  image?: string;
  certificatePdf?: string;
  credentialUrl?: string;
  skillsLearned?: string[];
  order?: number;
  createdAt: Date;
}

export interface IExperience extends Document {
  position: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies?: string[];
  companyLogo?: string;
  order?: number;
  createdAt: Date;
}

export interface IContactInfo extends Document {
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
  updatedAt: Date;
}

export interface IContactMessage extends Document {
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface INavbarItem {
  _id?: string;
  name: string;
  href: string;
  visible: boolean;
  order: number;
}

export interface INavbar extends Document {
  brandName: string;
  brandHighlight: string;
  logoLetter: string;
  logoUrl?: string;
  resumeButtonText: string;
  resumeButtonLink: string;
  items: INavbarItem[];
  updatedAt: Date;
}

export interface IFooter extends Document {
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
  updatedAt: Date;
}

export interface ISiteSettings extends Document {
  websiteTitle: string;
  metaDescription: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  defaultTheme: 'dark' | 'light';
  footerText: string;
  updatedAt: Date;
}
