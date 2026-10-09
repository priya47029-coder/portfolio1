import { Request, Response } from 'express';
import { Certification } from '../models/Certification';

// GET /api/certifications
export const getCertifications = async (_req: Request, res: Response): Promise<void> => {
  try {
    const certifications = await Certification.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: certifications.length,
      data: certifications
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch certifications.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// POST /api/certifications (auth)
export const createCertification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, organization, date, image, credentialUrl, skillsLearned, order } = req.body;

    if (!name || !organization || !date) {
      res.status(400).json({
        success: false,
        message: 'Certification name, organization, and date are required.'
      });
      return;
    }

    const skillsArray = Array.isArray(skillsLearned)
      ? skillsLearned
      : skillsLearned ? String(skillsLearned).split(',').map((s) => s.trim()).filter(Boolean) : [];

    const cert = await Certification.create({
      name,
      organization,
      date,
      image: image || '/assets/certifications/cert-placeholder.png',
      credentialUrl: credentialUrl || '',
      skillsLearned: skillsArray,
      order: order !== undefined ? Number(order) : 0
    });

    res.status(201).json({
      success: true,
      message: 'Certification created successfully.',
      data: cert
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create certification.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// PUT /api/certifications/:id (auth)
export const updateCertification = async (req: Request, res: Response): Promise<void> => {
  try {
    const { skillsLearned } = req.body;
    const updateData = { ...req.body };

    if (skillsLearned !== undefined) {
      updateData.skillsLearned = Array.isArray(skillsLearned)
        ? skillsLearned
        : String(skillsLearned).split(',').map((s) => s.trim()).filter(Boolean);
    }

    const updated = await Certification.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updated) {
      res.status(404).json({
        success: false,
        message: 'Certification not found.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Certification updated successfully.',
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update certification.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// DELETE /api/certifications/:id (auth)
export const deleteCertification = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Certification.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Certification not found.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Certification deleted successfully.',
      data: deleted
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete certification.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
