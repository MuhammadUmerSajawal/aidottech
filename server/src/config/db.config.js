const mongoose = require('mongoose');

/**
 * Configures and establishes connection to MongoDB.
 */
const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dotresearch';
  
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️  MongoDB Connection Warning: ${error.message}`);
    console.warn(`⚠️  System running in Mock-Fallback storage mode. Ready for frontend requests.`);
    return false;
  }
};

module.exports = connectDB;
