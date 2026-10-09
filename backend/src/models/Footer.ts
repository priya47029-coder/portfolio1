import mongoose, { Schema } from 'mongoose';
import { IFooter } from '../types';

const FooterSchema: Schema<IFooter> = new Schema(
  {
    brandName: { type: String, default: 'Priya' },
    brandHighlight: { type: String, default: 'P' },
    logoLetter: { type: String, default: 'P' },
    description: { type: String, default: 'B.Tech Information Technology Student @ Dhanalakshmi College of Engineering, Chennai (2024–2028). Building intuitive digital experiences & modern software applications.' },
    copyrightText: { type: String, default: 'Priya P. All rights reserved. Crafted with React, TypeScript & MongoDB.' },
    location: { type: String, default: 'Chennai, Tamil Nadu, India 📍' },
    email: { type: String, default: 'priya.p.it@dce.edu.in' },
    github: { type: String, default: 'https://github.com' },
    linkedin: { type: String, default: 'https://linkedin.com' },
    instagram: { type: String, default: 'https://instagram.com' }
  },
  { timestamps: true }
);

export const Footer = mongoose.model<IFooter>('Footer', FooterSchema);
