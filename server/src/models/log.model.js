const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Log content is required'],
      trim: true
    },
    category: {
      type: String,
      enum: {
        values: ['General', 'Hardware', 'Software', 'Theoretical'],
        message: 'Category must be: General, Hardware, Software, or Theoretical'
      },
      default: 'General'
    },
    author: {
      type: String,
      default: 'Lead Researcher',
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Log', LogSchema);
