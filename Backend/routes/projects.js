import express from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import { defaultProjects } from '../seed/seedData.js';

const router = express.Router();

// Public: GET all projects (with optional category & search filtering)
router.get('/', async (req, res) => {
  try {
    const { category, search, featured } = req.query;

    if (mongoose.connection.readyState !== 1) {
      let filtered = [...defaultProjects];
      if (category && category !== 'All') {
        filtered = filtered.filter((p) => p.category === category);
      }
      if (featured === 'true') {
        filtered = filtered.filter((p) => p.featured);
      }
      if (search) {
        const s = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title?.toLowerCase().includes(s) ||
            p.description?.toLowerCase().includes(s) ||
            p.technologies?.some((t) => t.toLowerCase().includes(s))
        );
      }
      return res.json(filtered);
    }

    const query = {};
    if (category && category !== 'All') query.category = category;
    if (featured === 'true') query.featured = true;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { technologies: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    res.json(projects.length > 0 ? projects : defaultProjects);
  } catch (err) {
    res.json(defaultProjects);
  }
});

// Public: GET single project
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (mongoose.connection.readyState === 1 && id.match(/^[0-9a-fA-F]{24}$/)) {
      const p = await Project.findById(id);
      if (p) return res.json(p);
    }
    const found = defaultProjects.find((p) => p.slug === id || p._id === id);
    if (found) return res.json(found);
    res.status(404).json({ error: 'Project not found' });
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving project' });
  }
});

export default router;
