const express = require('express');
const logController = require('../controllers/log.controller');

const router = express.Router();

router.route('/')
  .get(logController.getAllLogs)
  .post(logController.createLog);

module.exports = router;
