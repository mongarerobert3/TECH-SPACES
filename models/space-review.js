import mongoose from 'mongoose';

const spaceReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  space: { type: mongoose.Schema.Types.ObjectId, ref: 'Space', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

const SpaceReview = mongoose.model('SpaceReview', spaceReviewSchema);

export default SpaceReview;
