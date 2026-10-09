import { Request, Response } from 'express';
import { Education } from '../models/Education';

// GET /api/education
export const getEducation = async (_req: Request, res: Response): Promise<void> => {
  try {
    const educationList = await Education.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: educationList.length,
      data: educationList
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch education records.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// POST /api/education (auth)
export const createEducation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { institution, degree, fieldOfStudy, duration, location, grade, description, highlights, order } = req.body;

    if (!institution || !degree || !duration) {
      res.status(400).json({
        success: false,
        message: 'Institution, degree, and duration are required.'
      });
      return;
    }

    const highlightArray = Array.isArray(highlights)
      ? highlights
      : highlights ? String(highlights).split('\n').map((h) => h.trim()).filter(Boolean) : [];

    const edu = await Education.create({
      institution,
      degree,
      fieldOfStudy: fieldOfStudy || 'Information Technology',
      duration,
      location: location || 'Chennai, Tamil Nadu, India',
      grade: grade || '',
      description: description || '',
      highlights: highlightArray,
      order: order !== undefined ? Number(order) : 0
    });

    res.status(201).json({
      success: true,
      message: 'Education record created successfully.',
      data: edu
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create education record.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// PUT /api/education/:id (auth)
export const updateEducation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { highlights } = req.body;
    const updateData = { ...req.body };

    if (highlights !== undefined) {
      updateData.highlights = Array.isArray(highlights)
        ? highlights
        : String(highlights).split('\n').map((h) => h.trim()).filter(Boolean);
    }

    const updated = await Education.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updated) {
      res.status(404).json({
        success: false,
        message: 'Education record not found.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Education record updated successfully.',
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update education record.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// DELETE /api/education/:id (auth)
export const deleteEducation = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Education.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Education record not found.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Education record deleted successfully.',
      data: deleted
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete education record.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
