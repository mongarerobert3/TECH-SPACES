const express = require("express");
const { 
    bookSpace,
    allBooking,
    getSpaceBookings,
    getBookingById,
    updateBooking,
    deleteBooking,
    updateBookingStatus,
    cancelBooking,
    processPayment,
    getAllBookedSpaces
 } = require("../controllers/bookingController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new booking
router.route('/').post( protect, bookSpace);

// Get all bookings for a User
router.route('/:userId').get(protect, allBooking);

// Get all bookings
router.route('/').get(protect, getAllBookedSpaces);

// Get all space bookings
router.route('/space/:spaceId').get(protect, getSpaceBookings);

// Get a booking by ID
router.route('/:bookingId').get(protect, getBookingById);

// Update a booking by ID
router.route('/:bookingId').put(protect, updateBooking);

// Cancel a booking by ID
router.route('/cancel/:bookingId').put(protect, cancelBooking);

// Delete a booking by ID
router.route('/:bookingId').delete(protect, deleteBooking);

// Update booking status
updateBookingStatus,

// process payment
processPayment,

module.exports = router;