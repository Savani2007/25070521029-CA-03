import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import plantRoutes from './routes/plantRoutes.js';
import growthRoutes from './routes/growthRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import fertilizerRoutes from './routes/fertilizerRoutes.js';
import pestRoutes from './routes/pestRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import roomRoutes from './routes/roomRoutes.js';

connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api/plants', growthRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/fertilizer', fertilizerRoutes);
app.use('/api/pest', pestRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/rooms', roomRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'PlantPal API is running' });
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

export default app;
