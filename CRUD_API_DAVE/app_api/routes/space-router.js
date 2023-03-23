const express = require('express');
const router = express.Router();

const { Space, find } = require('./models/space');

// GET all TechSpaces
router.get('/spaces', async (req, res) => {
  try {
    const techSpaces = await find();
    res.json(techSpaces);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST a new TechSpace
router.post('/spaces', async (req, res) => {
  try {
    const { name, description, location } = req.body;
    const space = new Space({
      name,
      description,
      location,
    });
    await space.save();
    res.json(space);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
