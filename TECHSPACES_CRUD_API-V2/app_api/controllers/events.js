const mongoose = require('mongoose');
const Event = mongoose.model('Event');

// Get all events
const eventsList = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get an event by ID
const eventsReadOne =  async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventid);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Create a new event
const eventsCreateOne = async (req, res) => {
  const { title, description, date, start_time, end_time, location, max_attendees = 0, created_at } = req.body;
  if (max_attendees < 0) {
    return res.status(400).json({ msg: "Max attendees must be a non-negative value." });
  }
  try {
    const event = new Event({ title, description, date, start_time, end_time, location, max_attendees, created_at });
    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};



// Update an event by ID
const eventsUpdateOne = async (req, res) => {
  const { title, description, date, start_time, end_time, location, max_attendees } = req.body;
  if (max_attendees < 0) {
    return res.status(400).json({ msg: "Max attendees must be a non-negative value." });
  }
  try {
    let event = await Event.findById(req.params.eventid);
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
};

// Delete an event by ID
const eventsDeleteOne = async (req, res) => {
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
};

module.exports = {
  eventsCreateOne,
  eventsReadOne,
  eventsList,
  eventsDeleteOne,
  eventsUpdateOne
};