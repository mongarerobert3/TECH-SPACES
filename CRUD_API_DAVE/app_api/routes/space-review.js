const express = require('express');
const router = express.Router();
const passport = require('passport');
const { SpaceReview } = require('../models');

// POST /api/space/:id/reviews - Create a new review for a space
router.post('/:id/reviews', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const space = await Space.findById(req.params.id);
    if (!space) {
      return res.status(404).json({ error: 'Space not found' });
    }

    const review = new SpaceReview({
      user: req.user._id,
      space: space._id,
      rating: req.body.rating,
      comment: req.body.comment
    });

    await review.save();

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/space/:id/reviews - Get all reviews for a space
router.get('/:id/reviews', async (req, res) => {
  try {
    const space = await Space.findById(req.params.id);
    if (!space) {
      return res.status(404).json({ error: 'Space not found' });
    }

    const reviews = await SpaceReview.find({ space: space._id });

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
