const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  attendees: {
    type: Number,
    required: true
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
  bookings: [bookingSchema],
  attendees: {
    type: Number,
    default: 0,
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

module.exports = mongoose.model('Event', eventSchema);
module.exports = mongoose.model('Booking', bookingSchema);
