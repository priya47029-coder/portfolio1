import mongoose, { Schema } from 'mongoose';
import { IAbout } from '../types';

const AboutCardSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'bi-mortarboard-fill' },
  badge: { type: String, default: '' },
  gradient: { type: String, default: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)' },
  order: { type: Number, default: 0 }
});

const FocusPointSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'bi-check-lg' }
});

const AboutSchema: Schema<IAbout> = new Schema(
  {
    badge: { type: String, default: 'Get To Know Me' },
    heading: { type: String, default: 'About Me' },
    subheading: { type: String, default: 'Bridging aesthetics and code to create digital experiences that delight users and solve practical real-world problems.' },
    bioParagraph1: { type: String, default: 'I am currently pursuing my Bachelor of Technology in Information Technology (Batch 2024 – 2028) at Dhanalakshmi College of Engineering, Chennai. My journey revolves around crafting intuitive, user-first interfaces and transforming those ideas into fully functional applications.' },
    bioParagraph2: { type: String, default: 'Whether I am orchestrating fluid micro-interactions in Figma, building responsive web applications using React & Node.js, or scripting intelligent automation and algorithmic problem solving with Python, I strive for clean architecture and thoughtful craftsmanship.' },
    profileImage: { type: String, default: '/assets/images/priya-profile.svg' },
    careerInterests: { type: [String], default: ['UI/UX Design', 'Mobile Application Development', 'Python Programming', 'Web Technologies', 'Data Analytics'] },
    location: { type: String, default: 'Chennai, Tamil Nadu' },
    degree: { type: String, default: 'B.Tech – IT (2024–2028)' },
    languages: { type: String, default: 'English, Tamil' },
    focusTitle: { type: String, default: 'My Core Focus Areas' },
    focusDescription: { type: String, default: 'Committed to continuous learning across the entire product lifecycle—from user research and wireframing to backend database engineering.' },
    focusPoints: { type: [FocusPointSchema], default: [] },
    cards: { type: [AboutCardSchema], default: [] }
  },
  { timestamps: true }
);

export const About = mongoose.model<IAbout>('About', AboutSchema);
