import { Request, Response } from 'express';
import { SiteSettings } from '../models/SiteSettings';

// GET /api/settings
export const getSettings = async (_req: Request, res: Response): Promise<void> => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({});
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch site settings.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// PUT /api/settings (auth)
export const updateSettings = async (req: Request, res: Response): Promise<void> => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(req.body);
    } else {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, req.body, { new: true, runValidators: true });
    }

    res.status(200).json({
      success: true,
      message: 'Site settings updated successfully!',
      data: settings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update site settings.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
