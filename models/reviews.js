/**
 * _id: The unique ID for the review document.
 *user_id: The ID of the user who wrote the review.
 *space_id: The ID of the space being reviewed.
 *rating: The rating given to the space by the user (an integer between 1 and 5, for example).
 *comment: The user's comments about the space.
 *created_at: The date and time when the review was created.
 *updated_at: The date and time when the review was last updated.
 */

import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  techspace_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TechSpace',
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
