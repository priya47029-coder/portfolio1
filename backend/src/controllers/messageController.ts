import { Request, Response } from 'express';
import { ContactMessage } from '../models/ContactMessage';

// GET /api/messages (auth)
export const getMessages = async (_req: Request, res: Response): Promise<void> => {
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
      message: 'Failed to retrieve messages.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// PUT /api/messages/:id/read (auth)
export const markMessageRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const msg = await ContactMessage.findById(req.params.id);
    if (!msg) {
      res.status(404).json({ success: false, message: 'Message not found.' });
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

// DELETE /api/messages/:id (auth)
export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ success: false, message: 'Message not found.' });
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
      message: 'Failed to delete message.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
