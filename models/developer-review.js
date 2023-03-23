import mongoose from 'mongoose';

const developerReviewSchema = new mongoose.Schema({
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  developer: { type: mongoose.Schema.Types.ObjectId, ref: 'Developer', required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const DeveloperReview = mongoose.model('DeveloperReview', developerReviewSchema);

export default DeveloperReview;
