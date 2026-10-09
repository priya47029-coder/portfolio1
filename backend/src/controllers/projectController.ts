import { Request, Response } from 'express';
import { Project } from '../models/Project';

// GET /api/projects
export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search } = req.query;
    const query: any = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (search) {
      const searchRegex = new RegExp(String(search), 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { technologies: searchRegex }
      ];
    }

    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// GET /api/projects/:id
export const getProjectById = async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve project details.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// POST /api/projects (auth)
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, image, technologies, category, features, githubUrl, liveDemoUrl, featured, order } = req.body;

    if (!title || !description || !technologies || !category) {
      res.status(400).json({
        success: false,
        message: 'Please provide title, description, technologies, and category.'
      });
      return;
    }

    const techArray = Array.isArray(technologies)
      ? technologies
      : String(technologies).split(',').map((t) => t.trim()).filter(Boolean);

    const featureArray = Array.isArray(features)
      ? features
      : features ? String(features).split('\n').map((f) => f.trim()).filter(Boolean) : [];

    const project = await Project.create({
      title,
      description,
      image: image || '/assets/projects/project-placeholder.png',
      technologies: techArray,
      category,
      features: featureArray,
      githubUrl: githubUrl || '',
      liveDemoUrl: liveDemoUrl || '',
      featured: Boolean(featured),
      order: order !== undefined ? Number(order) : 0
    });

    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create project.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// PUT /api/projects/:id (auth)
export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const { technologies, features } = req.body;
    const updateData = { ...req.body };

    if (technologies !== undefined) {
      updateData.technologies = Array.isArray(technologies)
        ? technologies
        : String(technologies).split(',').map((t) => t.trim()).filter(Boolean);
    }

    if (features !== undefined) {
      updateData.features = Array.isArray(features)
        ? features
        : String(features).split('\n').map((f) => f.trim()).filter(Boolean);
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      res.status(404).json({
        success: false,
        message: 'Project not found.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      data: updatedProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update project.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// DELETE /api/projects/:id (auth)
export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      res.status(404).json({
        success: false,
        message: 'Project not found.'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully.',
      data: deletedProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete project.',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
