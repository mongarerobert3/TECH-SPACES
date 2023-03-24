const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  },
  start_time: {
    type: String,
    // required: true
  },
  end_time: {
    type: String,
    // required: true
  },
  location: {
    type: String,
    // required: true
  },
  max_attendees: {
    type: Number,
    required: true,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Events', eventSchema);
