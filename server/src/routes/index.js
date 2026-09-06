const express = require('express');
const projectRoutes = require('./project.routes');
const logRoutes = require('./log.routes');
const statsRoutes = require('./stats.routes');
const portfolioRoutes = require('./portfolio.routes');

const router = express.Router();

// Namespace all endpoint modules under /api/
router.use('/projects', projectRoutes);
router.use('/logs', logRoutes);
router.use('/stats', statsRoutes);
router.use('/portfolio', portfolioRoutes);

module.exports = router;
