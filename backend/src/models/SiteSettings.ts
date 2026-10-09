import mongoose, { Schema } from 'mongoose';
import { ISiteSettings } from '../types';

const SiteSettingsSchema: Schema<ISiteSettings> = new Schema(
  {
    websiteTitle: { type: String, default: 'Priya P | UI/UX Designer & App Developer' },
    metaDescription: { type: String, default: 'Portfolio of Priya P - B.Tech IT Student, UI/UX Designer, App Developer, and Python Enthusiast from Chennai, India.' },
    logo: { type: String, default: '/favicon.svg' },
    favicon: { type: String, default: '/favicon.svg' },
    primaryColor: { type: String, default: '#4f46e5' },
    secondaryColor: { type: String, default: '#ec4899' },
    defaultTheme: { type: String, enum: ['dark', 'light'], default: 'dark' },
    footerText: { type: String, default: 'Designed & Built by Priya P' }
  },
  { timestamps: true }
);

export const SiteSettings = mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema);
