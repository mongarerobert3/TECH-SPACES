const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const Booking = mongoose.model('Booking');

// Update booking
const updateBooking = async (req, res) => {
  const { attendees } = req.body;
  const booking = await Booking.findByIdAndUpdate(
    req.params.bookingid,
    { attendees, updated_at: Date.now() },
    { new: true },
  );
  // let attendeesToIncr = (attendees - booking.attendees)
  // Update the corresponding event's max_attendees and attendees fields
  await Event.findOneAndUpdate(
    { _id: req.params.eventid },
    { $inc: { max_attendees: -attendees, attendees: attendees } },
    { new: true }
  );
  return res.status(201).json(booking);
};

// more endpoints.
//Create booking
const createBooking = async (req, res) => {
  // Check if there are enough available slots for the booking
  const event = await Event.findById(req.params.eventid);
  const attendees = req.body.attendees;
  if (event.max_attendees - event.attendees < attendees) {
    throw new Error('Not enough available slots');
  }

  // Create the new booking
  const booking = new Booking({
    user: req.params.userid,
    event: event.id,
    attendees: attendees,
  });
  await booking.save();

  // Update the corresponding event's max_attendees and attendees fields
  await Event.findOneAndUpdate(
    { _id: event.id },
    { $inc: { max_attendees: -attendees, attendees: attendees } },
    { new: true }
  );

  return res.status(201).json(booking);
}

// update the index to have route users/:userid/bookings
const getBookingsForUser = async (req, res) => {
  userid = req.params.userid;
  const bookings = await Booking.find({ user: userid }).populate('event');
  return res.status(200).json(bookings);
}

// Read bookings of an event
const getBookingsForEvent = async (req, res) => {
  const bookings = await Booking.find({ event: req.params.eventid }).populate({
    path: 'user',
    select: '-hash -salt'
  });
  return res.status(200).json(bookings);
}
 

// Delete/cancel booking
const cancelBooking = async (req, res) => {
  // Retrieve the booking and corresponding event
  const booking = await Booking.findById(req.params.bookingid);
  const event = await Event.findById(req.params.eventid);

  // Update the corresponding event's max_attendees and attendees fields
  await Event.findOneAndUpdate(
    { _id: event.id },
    { $inc: { max_attendees: booking.attendees, attendees: -booking.attendees } },
    { new: true }
  );

  // Delete the booking
  await Booking.deleteOne({ _id: bookingId });
  return res.status(200).json({"message": "Booking cancelled"})
}

module.exports = {
  updateBooking,
  createBooking,
  cancelBooking,
  getBookingsForEvent,
  getBookingsForUser
}