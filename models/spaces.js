/**
 * Name: string,, required
* Address: string
* Rating: number condition min-1  and max - 2, default - 0
* Facilities: Array of strings - [strings]
* Coordinates:  GeoJSON path
*Subdocument -> opening times:
    * Days: string required
    * Opening: string
    * Closing: string
    * Closed: string
* Subdocument -> reviews:
    *Author: string
    * Rating: number condition min-1  and max - 2, default - 0
    * Review_txt: string
    * Created_on:  type - date default date.now()
 */

const mongoose = require('mongoose');

const openingTimesSchema = new mongoose.Schema({
  days: {
    type: String,
    required: true
  },
  opening: String,
  closing: String,
  closed: {
    type: Boolean,
    required: true
  }
});

const reviewSchema = new mongoose.Schema({
  author: String,
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  reviewText: String,
  createdOn: {
    type: Date,
    'default': Date.now
  }
});

const spaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  rating: {
    type: Number,
    'default': 0,
    min: 1,
    max: 5
  },
  facilities: [String],
  coords: {
    type: { type: String},
    index: [Number]
  },
  openingTimes: [openingTimesSchema],
  reviews: [reviewSchema]
});

spaceSchema.index({coords: '2dsphere'});

mongoose.model('Space', spaceSchema);

