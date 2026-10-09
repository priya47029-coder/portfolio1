
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';

import authRoutes from './routes/authRoutes';
import homeRoutes from './routes/homeRoutes';
import aboutRoutes from './routes/aboutRoutes';
import projectRoutes from './routes/projectRoutes';
import skillRoutes from './routes/skillRoutes';
import educationRoutes from './routes/educationRoutes';
import certificationRoutes from './routes/certificationRoutes';
import experienceRoutes from './routes/experienceRoutes';
import contactRoutes from './routes/contactRoutes';
import messageRoutes from './routes/messageRoutes';
import navbarRoutes from './routes/navbarRoutes';
import footerRoutes from './routes/footerRoutes';
import settingsRoutes from './routes/settingsRoutes';
import statsRoutes from './routes/statsRoutes';

import {
  errorHandler,
  notFoundHandler
} from './middleware/errorMiddleware';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        process.env.NODE_ENV !== 'production'
      ) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Priya Portfolio Backend API is running!',
    health: '/api/health'
  });
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'online',
    message: 'Priya P Dynamic CMS Portfolio API is operational',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/education', educationRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/navbar', navbarRoutes);
app.use('/api/footer', footerRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/stats', statsRoutes);

// Handle unknown routes
app.use(notFoundHandler);

// Centralized error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Priya P Portfolio Dynamic CMS API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

export default app;
