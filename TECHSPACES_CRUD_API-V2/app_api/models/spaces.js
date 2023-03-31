const mongoose = require('mongoose');

const openingTimesSchema = new mongoose.Schema({
  days: String,
  opening: String,
  closing: String,
  closed: Boolean,
});

const reviewSchema = new mongoose.Schema({
  author: String,
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  reviewText: String,
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const spaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: String,
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  facilities: [String],
  coords: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    },
  },
  openingTimes: [openingTimesSchema],
  reviews: [reviewSchema],
});

spaceSchema.index({ coords: '2dsphere' });

module.exports = mongoose.model('Space', spaceSchema);
