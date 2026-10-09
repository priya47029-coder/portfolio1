import mongoose, { Schema } from 'mongoose';
import { IContactInfo } from '../types';

const ContactInfoSchema: Schema<IContactInfo> = new Schema(
  {
    heading: { type: String, default: 'Get In Touch' },
    description: { type: String, default: 'Have a project in mind, an internship opportunity, or want to discuss UI/UX design & Python development? Drop a message below!' },
    email: { type: String, default: 'priya.p.it@dce.edu.in' },
    phone: { type: String, default: '+91 98765 43210' },
    location: { type: String, default: 'Chennai, Tamil Nadu, India' },
    college: { type: String, default: 'Dhanalakshmi College of Engineering' },
    responseTimeNote: { type: String, default: 'Currently responding within 24 hours' },
    linkedin: { type: String, default: 'https://linkedin.com' },
    github: { type: String, default: 'https://github.com' },
    figma: { type: String, default: 'https://figma.com' },
    instagram: { type: String, default: 'https://instagram.com' },
    twitter: { type: String, default: 'https://twitter.com' }
  },
  { timestamps: true }
);

export const ContactInfo = mongoose.model<IContactInfo>('ContactInfo', ContactInfoSchema);
