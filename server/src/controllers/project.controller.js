const projectService = require('../services/project.service');
const AppError = require('../utils/app-error');

/**
 * Controller handling Research Project request lifecycles.
 */
const projectController = {
  /**
   * GET /api/projects
   */
  async getAllProjects(req, res, next) {
    try {
      const projects = await projectService.getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  },

  /**
   * GET /api/projects/:id
   */
  async getProjectById(req, res, next) {
    try {
      const project = await projectService.getProjectById(req.params.id);
      if (!project) {
        return next(new AppError('Research project not found in database', 404));
      }
      res.status(200).json(project);
    } catch (error) {
      next(new AppError('Invalid project ID or file missing', 404));
    }
  },

  /**
   * POST /api/projects
   */
  async createProject(req, res, next) {
    try {
      const { title, domain, abstract, content, author } = req.body;
      
      // Simple validation before sending to service
      if (!title || !domain || !abstract || !content || !author) {
        return next(new AppError('All core treatise fields are required', 400));
      }

      const newProject = await projectService.createProject(req.body);
      res.status(201).json(newProject);
    } catch (error) {
      next(error);
    }
  },

  /**
   * PUT /api/projects/:id
   */
  async updateProject(req, res, next) {
    try {
      const updatedProject = await projectService.updateProject(req.params.id, req.body);
      if (!updatedProject) {
        return next(new AppError('Project not found to update', 404));
      }
      res.status(200).json(updatedProject);
    } catch (error) {
      next(error);
    }
  },

  /**
   * DELETE /api/projects/:id
   */
  async deleteProject(req, res, next) {
    try {
      await projectService.deleteProject(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'Research project successfully archived and removed from active grid.'
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = projectController;
