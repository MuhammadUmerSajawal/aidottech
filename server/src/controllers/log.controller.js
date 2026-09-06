const logService = require('../services/log.service');
const AppError = require('../utils/app-error');

/**
 * Controller handling Research Log/Observation lifecycle.
 */
const logController = {
  /**
   * GET /api/logs
   */
  async getAllLogs(req, res, next) {
    try {
      const logs = await logService.getAllLogs();
      res.status(200).json(logs);
    } catch (error) {
      next(error);
    }
  },

  /**
   * POST /api/logs
   */
  async createLog(req, res, next) {
    try {
      const { content } = req.body;
      if (!content || !content.trim()) {
        return next(new AppError('Log content cannot be empty', 400));
      }

      const newLog = await logService.createLog(req.body);
      res.status(201).json(newLog);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = logController;
