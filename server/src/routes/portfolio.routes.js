const express = require('express');
const portfolioController = require('../controllers/portfolio.controller');

const router = express.Router();

// Define stats route before detail routing to prevent parameter collisions
router.get('/stats', portfolioController.getStats);

router.route('/')
  .get(portfolioController.getAllItems)
  .post(portfolioController.createItem);

router.route('/:id')
  .get(portfolioController.getItemById)
  .put(portfolioController.updateItem)
  .delete(portfolioController.deleteItem);

module.exports = router;
