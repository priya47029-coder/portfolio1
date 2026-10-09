import { Request, Response } from 'express';
import { ContactMessage } from '../models/ContactMessage';

// POST /api/contact (public)
export const submitContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400).json({
        success: false,
        message: 'Something went wrong. Please try again. All fields (name, email, subject, message) are required.'
      });
      return;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
      return;
    }

    const newMessage = await ContactMessage.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
      message: message.trim(),
      read: false
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: newMessage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// GET /api/contact (auth)
export const getContactMessages = async (_req: Request, res: Response): Promise<void> => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve contact messages.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// DELETE /api/contact/:id (auth)
export const deleteContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({
        success: false,
        message: 'Contact message not found.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Message deleted successfully.',
      data: deleted
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact message.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// PUT /api/contact/:id/read (auth)
export const toggleMessageReadStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const msg = await ContactMessage.findById(req.params.id);
    if (!msg) {
      res.status(404).json({
        success: false,
        message: 'Contact message not found.'
      });
      return;
    }

    msg.read = !msg.read;
    await msg.save();

    res.status(200).json({
      success: true,
      message: `Message marked as ${msg.read ? 'read' : 'unread'}.`,
      data: msg
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update message status.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
