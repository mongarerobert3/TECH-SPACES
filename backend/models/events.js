const mongoose = require('mongoose');
const reviewSchema = require('./reviewSchema');

const eventBookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  start_time: {
    type: String,
    required: true
  },
  end_time: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  max_attendees: {
    type: Number,
    required: true,
    default: 0
  },
  bookings: [eventBookingSchema],
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
  },
  reviews: [reviewSchema],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = { Event };
