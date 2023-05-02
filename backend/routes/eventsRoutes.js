const express = require("express");
const {
    eventsCreateOne,
    eventsReadOne,
    eventsList,
    eventsDeleteOne,
    eventsUpdateOne
} = require("../controllers/events")
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Create an Event
router.route('/').post(protect, eventsCreateOne)

// Read one event
router.route('/:eventId').get(protect, eventsReadOne)

// Get all the events
router.route('/').get(protect, eventsList)

// Update an event
router.route('/:eventId').put(protect, eventsUpdateOne)

// delete an event
router.route('/:eventId').delete(protect, eventsDeleteOne)


module.exports = router