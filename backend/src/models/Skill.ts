import mongoose, { Schema } from 'mongoose';
import { ISkill } from '../types';

const SkillSchema: Schema<ISkill> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Skill name is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Skill category is required'],
      enum: ['UI/UX', 'Programming', 'Development', 'Tools', 'Other'],
      default: 'Development'
    },
    level: {
      type: Number,
      required: [true, 'Skill level (0-100) is required'],
      min: 0,
      max: 100,
      default: 80
    },
    icon: {
      type: String,
      default: 'bi-code-slash'
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

export const Skill = mongoose.model<ISkill>('Skill', SkillSchema);
