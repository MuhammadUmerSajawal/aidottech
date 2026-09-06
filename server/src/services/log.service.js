const Log = require('../models/log.model');
const mongoose = require('mongoose');

// Seed data for fallback mode
let mockLogs = [
  {
    _id: 'mock_log_1',
    content: 'Observed anomalous impedance deviation in alloy junction B-4 during cryogenic cooldown to 4.2 Kelvin.',
    category: 'Hardware',
    author: 'Dr. Kenji Tanaka',
    createdAt: new Date(Date.now() - 1000 * 60 * 45) // 45 mins ago
  },
  {
    _id: 'mock_log_2',
    content: "Consensus simulator branch 'v2-gossip' successfully integrated. Commencing 10,000 node latency stress test.",
    category: 'Software',
    author: 'Prof. Marcus Vance',
    createdAt: new Date(Date.now() - 1000 * 60 * 120) // 2 hours ago
  },
  {
    _id: 'mock_log_3',
    content: 'Completed draft of Chapter 4 on carbon nanotube transmission matrices. Sending to advisory committee.',
    category: 'Theoretical',
    author: 'Dr. Elena Rostova',
    createdAt: new Date(Date.now() - 1000 * 60 * 600) // 10 hours ago
  },
  {
    _id: 'mock_log_4',
    content: 'Calibrating spectrum analyzer range to 10GHz-20GHz. Noise floor stabilized at -112dBm.',
    category: 'Hardware',
    author: 'Dr. Elena Rostova',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
  }
];

const isDbConnected = () => mongoose.connection.readyState === 1;

const logService = {
  async getAllLogs() {
    if (isDbConnected()) {
      return await Log.find().sort({ createdAt: -1 });
    }
    return [...mockLogs].sort((a, b) => b.createdAt - a.createdAt);
  },

  async createLog(logData) {
    if (isDbConnected()) {
      return await Log.create(logData);
    }
    const newLog = {
      _id: 'mock_log_' + Date.now(),
      ...logData,
      createdAt: new Date()
    };
    mockLogs.push(newLog);
    return newLog;
  }
};

module.exports = logService;
