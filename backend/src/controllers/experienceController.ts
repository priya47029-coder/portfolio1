import { Request, Response } from 'express';
import { Experience } from '../models/Experience';

// GET /api/experience
export const getExperience = async (_req: Request, res: Response): Promise<void> => {
  try {
    const experienceList = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: experienceList.length,
      data: experienceList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch experience records.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// POST /api/experience (auth)
export const createExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const { position, company, startDate, endDate, description, technologies, location, order } = req.body;

    if (!position || !company || !startDate || !description) {
      res.status(400).json({
        success: false,
        message: 'Position, company, start date, and description are required.'
      });
      return;
    }

    const techArray = Array.isArray(technologies)
      ? technologies
      : technologies ? String(technologies).split(',').map((t) => t.trim()).filter(Boolean) : [];

    const exp = await Experience.create({
      position,
      company,
      startDate,
      endDate: endDate || 'Present',
      description,
      technologies: techArray,
      location: location || 'Chennai, India',
      order: order !== undefined ? Number(order) : 0
    });

    res.status(201).json({
      success: true,
      message: 'Experience record created successfully.',
      data: exp
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create experience record.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// PUT /api/experience/:id (auth)
export const updateExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const { technologies } = req.body;
    const updateData = { ...req.body };

    if (technologies !== undefined) {
      updateData.technologies = Array.isArray(technologies)
        ? technologies
        : String(technologies).split(',').map((t) => t.trim()).filter(Boolean);
    }

    const updated = await Experience.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updated) {
      res.status(404).json({
        success: false,
        message: 'Experience record not found.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Experience record updated successfully.',
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update experience record.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// DELETE /api/experience/:id (auth)
export const deleteExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Experience.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Experience record not found.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Experience record deleted successfully.',
      data: deleted
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete experience record.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
