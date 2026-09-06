const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Vertical AI engine name is required'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters long']
    },
    domain: {
      type: String,
      required: [true, 'Theoretical domain sector is required'],
      trim: true
    },
    accentQuote: {
      type: String,
      trim: true,
      default: ''
    },
    description: {
      type: String,
      required: [true, 'Treatise specifications description is required'],
      trim: true
    },
    techStack: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Portfolio', PortfolioSchema);
