const mongoose = require('mongoose');
const reviewSchema = require('./reviewSchema');

const openingTimesSchema = new mongoose.Schema({
  days: String,
  opening: String,
  closing: String,
  closed: Boolean,
});

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: "",
  },
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
  address: {
    type:String, 
    unique: true
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
  images: [imageSchema],
});

spaceSchema.methods.calculateAverageRating = function () {
  const totalRatings = this.ratings.reduce((acc, curr) => acc + curr, 0);
  const averageRating = totalRatings / this.ratings.length;
  this.rating = averageRating;
  return averageRating;
}

spaceSchema.index({ coords: '2dsphere' });

mongoose.model('Space', spaceSchema);

module.exports = mongoose.model('Space', spaceSchema);
