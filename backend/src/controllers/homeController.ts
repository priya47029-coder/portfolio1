import { Request, Response } from 'express';
import { Home } from '../models/Home';

// GET /api/home
export const getHome = async (_req: Request, res: Response): Promise<void> => {
  try {
    let home = await Home.findOne();
    if (!home) {
      home = await Home.create({});
    }
    res.status(200).json({ success: true, data: home });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch home content.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// PUT /api/home (auth)
export const updateHome = async (req: Request, res: Response): Promise<void> => {
  try {
    let home = await Home.findOne();
    if (!home) {
      home = await Home.create(req.body);
    } else {
      home = await Home.findByIdAndUpdate(home._id, req.body, { new: true, runValidators: true });
    }

    res.status(200).json({
      success: true,
      message: 'Home section updated successfully!',
      data: home
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update home content.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
