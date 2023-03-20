const express = require('express');
const router = express.Router();
const DeveloperReview = require('../models/developer-review');

// Create a new developer review
router.post('/', async (req, res) => {
  try {
    const { developerId, userId, rating, comment } = req.body;

    const newReview = new DeveloperReview({
      developer: developerId,
      user: userId,
      rating,
      comment
    });

    const savedReview = await newReview.save();

    res.json(savedReview);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// Get all developer reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await DeveloperReview.find().populate('developer').populate('user');

    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
