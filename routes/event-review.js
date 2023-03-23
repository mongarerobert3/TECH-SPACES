const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const EventReview = require('../models/event-review');
const { authenticateToken } = require('../auth/auth');

// Create a review for an event
router.post('/:id/reviews', authenticateToken, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const eventId = req.params.id;
    const userId = req.user.id;

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user has already reviewed the event
    const existingReview = await EventReview.findOne({ eventId, userId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this event' });
    }

    // Create the new review
    const newReview = new EventReview({
      rating,
      comment,
      eventId,
      userId
    });

    // Save the review to the database
    const savedReview = await newReview.save();

    // Update the event's average rating
    const reviews = await EventReview.find({ eventId });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    await Event.findByIdAndUpdate(eventId, { averageRating });

    res.status(201).json({ message: 'Review created successfully', review: savedReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
