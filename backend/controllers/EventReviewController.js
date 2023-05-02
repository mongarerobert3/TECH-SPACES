const Event = require('../models/events');
const EventReview = require('../models/event-review');

const createEventReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const eventId = req.params.id;
    const userId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const existingReview = await EventReview.findOne({ eventId, userId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this event' });
    }

    const newReview = new EventReview({
      rating,
      comment,
      eventId,
      userId
    });

    const savedReview = await newReview.save();

    await updateEventRating(eventId);

    res.status(201).json({ message: 'Review created successfully', review: savedReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateEventRating = async (eventId) => {
  const reviews = await EventReview.find({ eventId });
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;
  await Event.findByIdAndUpdate(eventId, { averageRating });
};

module.exports = {
  createEventReview,
  updateEventRating
};
