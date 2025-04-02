import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['info', 'error', 'warning'],
    default: 'info'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Log = mongoose.model('Log', logSchema);
export default Log;
