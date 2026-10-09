import mongoose, { Schema } from 'mongoose';
import { INavbar } from '../types';

const NavbarItemSchema = new Schema({
  name: { type: String, required: true },
  href: { type: String, required: true },
  visible: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
});

const NavbarSchema: Schema<INavbar> = new Schema(
  {
    brandName: { type: String, default: 'Priya' },
    brandHighlight: { type: String, default: 'P' },
    logoLetter: { type: String, default: 'P' },
    logoUrl: { type: String, default: '' },
    resumeButtonText: { type: String, default: 'Resume' },
    resumeButtonLink: { type: String, default: '/resume/Priya-Resume.pdf' },
    items: {
      type: [NavbarItemSchema],
      default: [
        { name: 'Home', href: '#home', visible: true, order: 1 },
        { name: 'About', href: '#about', visible: true, order: 2 },
        { name: 'Skills', href: '#skills', visible: true, order: 3 },
        { name: 'Projects', href: '#projects', visible: true, order: 4 },
        { name: 'Education', href: '#education', visible: true, order: 5 },
        { name: 'Certifications', href: '#certifications', visible: true, order: 6 },
        { name: 'Experience', href: '#experience', visible: true, order: 7 },
        { name: 'Contact', href: '#contact', visible: true, order: 8 }
      ]
    }
  },
  { timestamps: true }
);

export const Navbar = mongoose.model<INavbar>('Navbar', NavbarSchema);
