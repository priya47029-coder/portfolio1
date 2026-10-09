import mongoose, { Schema } from 'mongoose';
import { IProject } from '../types';

const ProjectSchema: Schema<IProject> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true
    },
    image: {
      type: String,
      default: '/assets/projects/project-placeholder.png'
    },
    technologies: {
      type: [String],
      required: [true, 'At least one technology is required']
    },
    category: {
      type: String,
      required: [true, 'Project category is required'],
      trim: true
    },
    features: {
      type: [String],
      default: []
    },
    githubUrl: {
      type: String,
      default: ''
    },
    liveDemoUrl: {
      type: String,
      default: ''
    },
    featured: {
      type: Boolean,
      default: false
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

export const Project = mongoose.model<IProject>('Project', ProjectSchema);
