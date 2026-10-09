import { Request, Response } from 'express';
import { Project } from '../models/Project';
import { Skill } from '../models/Skill';
import { Education } from '../models/Education';
import { Certification } from '../models/Certification';
import { Experience } from '../models/Experience';
import { ContactMessage } from '../models/ContactMessage';

// GET /api/stats (auth)
export const getDashboardStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [
      totalProjects,
      totalSkills,
      totalEducation,
      totalCertifications,
      totalExperience,
      totalMessages,
      unreadMessages
    ] = await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Education.countDocuments(),
      Certification.countDocuments(),
      Experience.countDocuments(),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ read: false })
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalProjects,
        totalSkills,
        totalEducation,
        totalCertifications,
        totalExperience,
        totalMessages,
        unreadMessages
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard statistics.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
