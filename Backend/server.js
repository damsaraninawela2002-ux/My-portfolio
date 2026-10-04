import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import projectRoutes from './routes/projects.js';
import contactRoutes from './routes/contact.js';
import Project from './models/Project.js';
import { defaultProjects } from './seed/seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Auto-Seeder (Public data)
const autoSeedDatabase = async () => {
  try {
    const count = await Project.countDocuments();
    if (count === 0) {
      console.log('🌱 Seeding initial projects into MongoDB...');
      await Project.insertMany(defaultProjects);
      console.log('✅ Projects seeded successfully!');
    }
  } catch (err) {
    console.warn('⚠️ MongoDB seed notice:', err.message);
  }
};

// Graceful error handling for mongoose connection events
mongoose.connection.on('error', (err) => {
  console.warn('⚠️ MongoDB connection event error:', err.message);
});

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) return;

  try {
    await mongoose.connect(uri, {
      dbName: process.env.DATABASE_NAME || 'portfolio_db',
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ Connected to MongoDB successfully!');
    await autoSeedDatabase();
  } catch (err) {
    console.warn('⚠️ MongoDB connection notice:', err.message);
  }
};

connectDB();

// API Routes (Projects & Contact only — No Admin/Auth)
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (req, res) => {
  res.json({
    message: 'Damsarani Nawela Portfolio API',
    endpoints: {
      health: '/api/health',
      projects: '/api/projects',
      contact: '/api/contact',
    },
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Portfolio API running on http://localhost:${PORT}`);
});
