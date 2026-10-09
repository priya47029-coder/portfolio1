import { Request, Response } from 'express';
import { About } from '../models/About';

// GET /api/about
export const getAbout = async (_req: Request, res: Response): Promise<void> => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }
    res.status(200).json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch about content.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// PUT /api/about (auth)
export const updateAbout = async (req: Request, res: Response): Promise<void> => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create(req.body);
    } else {
      about = await About.findByIdAndUpdate(about._id, req.body, { new: true, runValidators: true });
    }

    res.status(200).json({
      success: true,
      message: 'About section updated successfully!',
      data: about
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update about content.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
