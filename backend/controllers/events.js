const expressAsyncHandler = require("express-async-handler");
const { Event } = require('../models/events');

// @desc    Get all Events
// @route   POST /api/bookings
// @access  Public
const eventsList = expressAsyncHandler(async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Find an Event by Id
// @route   POST /api/bookings
// @access  Public
const eventsReadOne = expressAsyncHandler(async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});


// @desc    Create an event
// @route   POST /api/bookings
// @access  Public
const eventsCreateOne = async (req, res, next) => {
  try {
    const { title, description, date, start_time, end_time, location, max_attendees } = req.body;
    const user = req.user; // Assuming user is already authenticated

    if (!title || !description || !date || !start_time || !end_time || !location) {
      return res.status(400).json({ message: 'Please enter all the required fields' });
    }

    if (!user) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const eventExists = await Event.findOne({ title, date, start_time, location });

    if (eventExists) {
      return res.status(400).json({ message: 'Event already exists' });
    }
    
    const event = await Event.create({
      title,
      description,
      date,
      start_time,
      end_time,
      location,
      max_attendees,
    });

    return res.status(201).json(event);
  } catch (error) {
    return next(error);
  }
};

// @desc    Update an Event
// @route   POST /api/bookings
// @access  Public
const eventsUpdateOne = expressAsyncHandler(async (req, res) => {
  const { title, description, date, start_time, end_time, location, max_attendees } = req.body;
  if (max_attendees < 0) {
    return res.status(400).json({ msg: "Max attendees must be a non-negative value." });
  }
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    event.title = title || event.title;
    event.description = description || event.description;
    event.date = date || event.date;
    event.start_time = start_time || event.start_time;
    event.end_time = end_time || event.end_time;
    event.location = location || event.location;
    event.max_attendees = max_attendees || event.max_attendees;
    event.updated_at = Date.now();
    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @desc    Delete an Event
// @route   POST /api/bookings
// @access  Public
const eventsDeleteOne = expressAsyncHandler(async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventid);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    await event.remove();
    res.status(204).send('Event deleted' );
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = {
  eventsCreateOne,
  eventsReadOne,
  eventsList,
  eventsDeleteOne,
  eventsUpdateOne
};
