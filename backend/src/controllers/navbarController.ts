import { Request, Response } from 'express';
import { Navbar } from '../models/Navbar';

// GET /api/navbar
export const getNavbar = async (_req: Request, res: Response): Promise<void> => {
  try {
    let navbar = await Navbar.findOne();
    if (!navbar) {
      navbar = await Navbar.create({});
    }
    res.status(200).json({ success: true, data: navbar });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch navbar configuration.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// PUT /api/navbar (auth)
export const updateNavbar = async (req: Request, res: Response): Promise<void> => {
  try {
    let navbar = await Navbar.findOne();
    if (!navbar) {
      navbar = await Navbar.create(req.body);
    } else {
      navbar = await Navbar.findByIdAndUpdate(navbar._id, req.body, { new: true, runValidators: true });
    }

    res.status(200).json({
      success: true,
      message: 'Navbar configuration updated successfully!',
      data: navbar
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update navbar configuration.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
