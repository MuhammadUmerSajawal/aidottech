const statsService = require('../services/stats.service');

/**
 * Controller handling system analytics and metrics.
 */
const statsController = {
  /**
   * GET /api/stats/summary
   */
  async getSummaryStats(req, res, next) {
    try {
      const stats = await statsService.getSummaryStats();
      res.status(200).json(stats);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = statsController;
