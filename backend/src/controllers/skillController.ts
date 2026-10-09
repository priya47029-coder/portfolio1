import { Request, Response } from 'express';
import { Skill } from '../models/Skill';

// GET /api/skills
export const getSkills = async (_req: Request, res: Response): Promise<void> => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1, name: 1 });
    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch skills.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// POST /api/skills (auth)
export const createSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, category, level, icon, order } = req.body;

    if (!name || !category || level === undefined) {
      res.status(400).json({
        success: false,
        message: 'Skill name, category, and level are required.'
      });
      return;
    }

    const skill = await Skill.create({
      name,
      category,
      level: Number(level),
      icon: icon || 'bi-code-slash',
      order: order !== undefined ? Number(order) : 0
    });

    res.status(201).json({
      success: true,
      message: 'Skill created successfully.',
      data: skill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create skill.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// PUT /api/skills/:id (auth)
export const updateSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedSkill) {
      res.status(404).json({
        success: false,
        message: 'Skill not found.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Skill updated successfully.',
      data: updatedSkill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update skill.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// DELETE /api/skills/:id (auth)
export const deleteSkill = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) {
      res.status(404).json({
        success: false,
        message: 'Skill not found.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Skill deleted successfully.',
      data: deletedSkill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete skill.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
