const express = require('express');
const jwt = require('jsonwebtoken');


const {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne,
} = require('../controllers/reviews');





const {
  allNotifications,
  createNotification,
  updateNotification,
  deleteNotification
} = require ('../controllers/NotificationController')



const {
  createDeveloperReview,
  getDeveloperReview,
} = require ('../controllers/developerController')

const {
  createEventReview,
  updateEventRating,
} = require ('../controllers/EventReviewController');

const { default: DeveloperReview } = require('../models/developer-review');

const {
  getBookingsForEvent,
  cancelBooking,
  createBooking,
  updateBooking,
  getBookingsForUser
} = require('../controllers/eventsBooking')

const router = express.Router();
const auth = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized access.' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: 'Authorization header is missing.' });
  }
};



// reviews
router
  .route('/spaces/:spaceid/reviews')
  .post( reviewsCreate);

router
  .route('/spaces/:spaceid/reviews/:reviewid')
  .get(reviewsReadOne)
  .put( reviewsUpdateOne)
  .delete( reviewsDeleteOne);

// events
router
  .route('/events')
  .get(eventsList)
  .post( eventsCreateOne);

router
  .route('/events/:eventid')
  .get(eventsReadOne)
  .put( eventsUpdateOne)
  .delete( eventsDeleteOne);

router
  .route('/users/:userid/bookings')
  .get(getBookingsForUser);
  
//Notifications
router
  .route('/user/:userid/notifications')
  .get(allNotifications)

router
  .route('/user/:userid/notifications/:notificationid')
  .post(createNotification)
  .put(updateNotification)
  .delete(deleteNotification);


//Developer review
router
  .route('/user/:userid/reviews')
  .post(createDeveloperReview)
  .get(getDeveloperReview)

// Event controller
router
  .route('/events/:eventid/review')
  .post ( createEventReview,)

router
  .route('/events/:eventid')
  .put(updateEventRating)

// Booking
router
  .route('/events/:eventid/bookings')
  .get(getBookingsForEvent)
router
  .route('/events/:eventid/bookings/:userid')
  .post(createBooking)
router
  .route('/events/:eventid/bookings/:bookingid')
  .put(updateBooking)
  .delete(cancelBooking)

module.exports = router;
