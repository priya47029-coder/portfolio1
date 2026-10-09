import { Request, Response } from 'express';
import { ContactInfo } from '../models/ContactInfo';

// GET /api/contact
export const getContactInfo = async (_req: Request, res: Response): Promise<void> => {
  try {
    let contact = await ContactInfo.findOne();
    if (!contact) {
      contact = await ContactInfo.create({});
    }
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact details.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// PUT /api/contact (auth)
export const updateContactInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    let contact = await ContactInfo.findOne();
    if (!contact) {
      contact = await ContactInfo.create(req.body);
    } else {
      contact = await ContactInfo.findByIdAndUpdate(contact._id, req.body, { new: true, runValidators: true });
    }

    res.status(200).json({
      success: true,
      message: 'Contact details updated successfully!',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update contact details.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
