import mongoose, { Schema } from 'mongoose';
import { IHome } from '../types';

const HomeSchema: Schema<IHome> = new Schema(
  {
    greeting: { type: String, default: "Hi, I'm Priya 👋" },
    name: { type: String, default: 'PRIYA P' },
    title: { type: String, default: 'B.Tech Information Technology Student' },
    subtitle: { type: String, default: 'UI/UX Designer | App Developer | Python Enthusiast' },
    description: { type: String, default: 'I create user-friendly digital experiences and practical applications.' },
    profileImage: { type: String, default: '/assets/images/priya-profile.svg' },
    resumeUrl: { type: String, default: '/resume/Priya-Resume.pdf' },
    availabilityText: { type: String, default: 'Open to Internships & Opportunities' },
    location: { type: String, default: 'Chennai, Tamil Nadu, India' },
    collegeText: { type: String, default: 'Dhanalakshmi College of Engineering (2024–2028)' },
    primaryButtonText: { type: String, default: 'View My Projects' },
    primaryButtonLink: { type: String, default: '#projects' },
    secondaryButtonText: { type: String, default: 'Download Resume' },
    secondaryButtonLink: { type: String, default: '/resume/Priya-Resume.pdf' },
    tertiaryButtonText: { type: String, default: 'Contact Me' },
    tertiaryButtonLink: { type: String, default: '#contact' },
    techPills: { type: [String], default: ['Figma', 'Python', 'React', 'Node.js', 'MongoDB'] }
  },
  { timestamps: true }
);

export const Home = mongoose.model<IHome>('Home', HomeSchema);
