const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long']
    },
    domain: {
      type: String,
      required: [true, 'Theoretical domain is required'],
      trim: true
    },
    status: {
      type: String,
      enum: {
        values: ['Draft', 'In Progress', 'Under Review', 'Completed'],
        message: 'Status must be: Draft, In Progress, Under Review, or Completed'
      },
      default: 'Draft'
    },
    abstract: {
      type: String,
      required: [true, 'Abstract is required'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Treatise core content is required'],
      trim: true
    },
    author: {
      type: String,
      required: [true, 'Lead researcher / Author is required'],
      trim: true
    },
    tags: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Project', ProjectSchema);
