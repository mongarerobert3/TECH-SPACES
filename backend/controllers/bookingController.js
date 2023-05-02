const expressAsyncHandler = require('express-async-handler');
const Booking = require('../models/bookingSchema');
const Space = require("../models/spaces")

// @desc    Book a space
// @route   POST /api/bookings
// @access  Public
const bookSpace = expressAsyncHandler(async (req, res) => {
    const { spaceId, userId, startDate, endDate } = req.body;
  
    // Check if the space is available for booking
    const space = await Space.findById(spaceId);
  
    if (!space) {
      return res.status(400).json({
        message: "Space not found"
      });
    }
  
    const isBooked = await Booking.findOne({
      space: spaceId,
      $or: [
          { startDate: { $lte: new Date(startDate) }, endDate: {$gte: new Date(startDate)}},
          { startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(endDate) } },
          { startDate: { $gte: new Date(startDate) }, endDate: { $lte: new Date(endDate) } }
      ]
    });
  
    if (isBooked) {
      return res.status(400).json({
          message: "This space is already booked for the selected dates."
      });
    }
  
    try 
    {
        const createdBooking = await Booking.create({
          space: spaceId,
          user: userId,
          startDate,
          endDate
        });
    
        const populatedBooking = await Booking.findById(createdBooking._id)
          .populate('user', '-password')
          .populate('space');
      
        res.status(201).json(populatedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    All space Bookings for a user
// @route   POST /api/booking/:userId
// @access  Public
const allBooking = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;

  const bookings = await Booking.find({ user: userId })
    .populate('user', '-password')
    .populate('space')

  if(!bookings) {
    return res.status(404).json({ message: "No bookings found"})
  }

  res.status(200).json(bookings)
});

// @desc    All spaces Booked
// @route   GET /api/bookings
// @access  Public
const getAllBookedSpaces = expressAsyncHandler(async (req, res) => {
  const { id:bookingId } = req.params;

  const booked = await Booking.find( {space: bookingId})
    .populate('space')

  if(!booked) {
    return res.status(404).json( { message: "No space is booked"})
  }

  res.status(200).json(booked)
});

// @desc    All bookings for a space
/**
 * important when you need to reserve a specific 
 * space for a specific time period in advance.
 */
// @route   GET /api/bookings/space/:spaceId
// @access  Public
const getSpaceBookings = expressAsyncHandler(async (req, res) => {
  const { spaceId } = req.params;

  const bookings = await Booking.find({ space: spaceId })
    .populate('user', '-password')
    .populate('space');

  if (bookings.length === 0) {
    return res.status(404).json({ message: 'No bookings found for this space' });
  }

  res.status(200).json(bookings);
});

// @desc    All spaces Booked
// @route   GET /api/bookings
// @access  Public
const getBookingById = expressAsyncHandler(async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// @desc    Update booking by ID
// @route   PUT /api/bookings/:bookingId
// @access  Public
const updateBooking = expressAsyncHandler(async (req, res) => {
  const { bookingId } = req.params;


  const booking = await Booking.findById(bookingId);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  // Check if the user is authorized to update the booking
  if (booking.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { startDate, endDate } = req.body;

  // Validate input data
  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Please provide start and end date' });
  }

  // Update booking data
  booking.startDate = startDate;
  booking.endDate = endDate;

  await booking.save();

  res.status(200).json({ message: 'Booking updated successfully', booking });
});
  

// @desc    DELETE booking by ID
// @route   DELETE /api/bookings/:bookingId
// @access  Public
const deleteBooking = expressAsyncHandler(async (req, res) => {
  const { bookingId} = req.params;

  const deletedbooking = await Booking.findByIdAndDelete(bookingId);

  if (!deletedbooking) {
    return res.status(404).json({ message: 'No such Booking'});
  }

  return res.status(200).json({message: "Booking deleted successfully"})
});

const updateBookingStatus = async (bookingId) => {
try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
    throw new Error("Booking not found");
    }
    booking.status = "approved";
    await booking.save();
    console.log(`Booking ${bookingId} status updated to approved`);
} catch (error) {
    console.error(`Error updating booking status: ${error.message}`);
}
};


const cancelBooking = expressAsyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  //update booking status to "cancelled"
  const result = await Booking.updateOne({ _id:bookingId },
    {$set: {status: 'cancelled'}})

  res.status(200).json({ message: 'Booking cancelled successfully' });
});


// Payment processing function
const processPayment = async (bookingId, amount) => {
// Process payment logic here

// Update booking status to "approved"
await updateBookingStatus(bookingId);

console.log(`Payment processed for booking ${bookingId}`);
};
  
module.exports = { bookSpace,
    allBooking,
    getAllBookedSpaces,
    getSpaceBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    updateBookingStatus,
    cancelBooking,
    processPayment
 };
