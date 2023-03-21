const mongoose = require('mongoose')
const Event = mongoose.model('Event');

// Get all events
const eventsList = async (req, res) => {
  try {
    const events = await Event.find().populate('attendees').populate('space');
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get an event by ID
const eventsReadOne =  async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventid).populate('attendees').populate('space');
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
  const { title, description, location, date, space } = req.body;
  try {
    const event = new Event({ title, description, location, date, space });
    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update an event by ID
const eventsUpdateOne = async (req, res) => {
  const { title, description, location, date, space } = req.body;
  try {
    let event = await Event.findById(req.params.eventid);
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    event.title = title || event.title;
    event.description = description || event.description;
    event.location = location || event.location;
    event.date = date || event.date;
    event.space = space || event.space;
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
    res.json({ msg: 'Event deleted' });
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