const portfolioService = require('../services/portfolio.service');
const AppError = require('../utils/app-error');

/**
 * Controller handling Portfolio request/response lifecycles.
 */
const portfolioController = {
  async getAllItems(req, res, next) {
    try {
      const items = await portfolioService.getAllItems();
      res.status(200).json(items);
    } catch (error) {
      next(error);
    }
  },

  async getItemById(req, res, next) {
    try {
      const item = await portfolioService.getItemById(req.params.id);
      if (!item) {
        return next(new AppError('AI Engine configuration not found in database', 404));
      }
      res.status(200).json(item);
    } catch (error) {
      next(error);
    }
  },

  async createItem(req, res, next) {
    try {
      const { name, domain, description } = req.body;
      if (!name || !domain || !description) {
        return next(new AppError('Title, domain, and description specs are required', 400));
      }
      const newItem = await portfolioService.createItem(req.body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  },

  async updateItem(req, res, next) {
    try {
      const updated = await portfolioService.updateItem(req.params.id, req.body);
      if (!updated) {
        return next(new AppError('AI Engine not found to update', 404));
      }
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  },

  async deleteItem(req, res, next) {
    try {
      await portfolioService.deleteItem(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'Engine successfully archived from grid nodes.'
      });
    } catch (error) {
      next(error);
    }
  },

  async getStats(req, res, next) {
    try {
      const stats = await portfolioService.getStats();
      res.status(200).json(stats);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = portfolioController;
