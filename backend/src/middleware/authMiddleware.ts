import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AdminUser } from '../models/AdminUser';
import { IAdminUser } from '../types';

export interface AuthRequest extends Request {
  user?: IAdminUser;
}

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const authenticateAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Access denied. No authorization token provided.'
      });
      return;
    }

    const secret = process.env.JWT_SECRET || 'supersecretjwtkey_priya_portfolio_2024_2028';
    const decoded = jwt.verify(token, secret) as JwtPayload;

    const user = await AdminUser.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid token: Administrator account not found.'
      });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Not authorized or token expired.',
      error: error instanceof Error ? error.message : 'Unknown auth error'
    });
  }
};
