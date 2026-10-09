import { Request, Response } from 'express';
import { Footer } from '../models/Footer';

// GET /api/footer
export const getFooter = async (_req: Request, res: Response): Promise<void> => {
  try {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = await Footer.create({});
    }
    res.status(200).json({ success: true, data: footer });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch footer configuration.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// PUT /api/footer (auth)
export const updateFooter = async (req: Request, res: Response): Promise<void> => {
  try {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = await Footer.create(req.body);
    } else {
      footer = await Footer.findByIdAndUpdate(footer._id, req.body, { new: true, runValidators: true });
    }

    res.status(200).json({
      success: true,
      message: 'Footer configuration updated successfully!',
      data: footer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update footer configuration.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
