import mongoose, { Schema } from 'mongoose';
import { IEducation } from '../types';

const EducationSchema: Schema<IEducation> = new Schema(
  {
    institution: {
      type: String,
      required: [true, 'Institution name is required'],
      trim: true
    },
    degree: {
      type: String,
      required: [true, 'Degree is required'],
      trim: true
    },
    fieldOfStudy: {
      type: String,
      default: 'Information Technology'
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true
    },
    location: {
      type: String,
      default: 'Chennai, Tamil Nadu, India'
    },
    grade: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    highlights: {
      type: [String],
      default: []
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

export const Education = mongoose.model<IEducation>('Education', EducationSchema);
