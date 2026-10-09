import mongoose, { Schema } from 'mongoose';
import { IExperience } from '../types';

const ExperienceSchema: Schema<IExperience> = new Schema(
  {
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true
    },
    company: {
      type: String,
      required: [true, 'Company / Organization is required'],
      trim: true
    },
    startDate: {
      type: String,
      required: [true, 'Start date is required'],
      trim: true
    },
    endDate: {
      type: String,
      required: [true, 'End date is required'],
      default: 'Present'
    },
    description: {
      type: String,
      required: [true, 'Description is required']
    },
    technologies: {
      type: [String],
      default: []
    },
    location: {
      type: String,
      default: 'Chennai, India'
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export const Experience = mongoose.model<IExperience>('Experience', ExperienceSchema);
