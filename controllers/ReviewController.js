import SpaceReview from '../models/space-review';
import DeveloperReview from '../models/developer-review';
import EventReview from '../models/event-review';

// Controller function to create a new review for a space
export const createSpaceReview = async (req, res) => {
  try {
    const { body } = req;
    const review = new SpaceReview(body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to create a new review for a developer
export const createDeveloperReview = async (req, res) => {
  try {
    const { body } = req;
    const review = new DeveloperReview(body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to create a new review for an event
export const createEventReview = async (req, res) => {
  try {
    const { body } = req;
    const review = new EventReview(body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
