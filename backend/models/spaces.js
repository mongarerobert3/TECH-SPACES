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
  comment: String,
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

spaceSchema.methods.calculateAverageRating = function() {
  let totalRating = 0;
  if (this.reviews && this.reviews.length > 0) {
    this.reviews.forEach(review => {
      totalRating += review.rating;
    });
    this.rating = Math.round((totalRating / this.reviews.length) * 10) / 10;
  } else {
    this.rating = 0;
  }
};

module.exports = mongoose.model('Space', spaceSchema);
