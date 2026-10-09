import mongoose, { Schema } from 'mongoose';
import { ICertification } from '../types';

const CertificationSchema: Schema<ICertification> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Certification name is required'],
      trim: true
    },
    organization: {
      type: String,
      required: [true, 'Organization name is required'],
      trim: true
    },
    date: {
      type: String,
      required: [true, 'Issue date is required'],
      trim: true
    },
    image: {
      type: String,
      default: '/assets/certifications/cert-placeholder.png'
    },
    credentialUrl: {
      type: String,
      default: ''
    },
    skillsLearned: {
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

export const Certification = mongoose.model<ICertification>('Certification', CertificationSchema);
