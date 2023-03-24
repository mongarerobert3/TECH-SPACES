const express = require('express');
const jwt = require('jsonwebtoken');

const {
  spacesListByDistance,
  spacesCreate,
  spacesReadOne,
  spacesUpdateOne,
  spacesDeleteOne,
} = require('../controllers/spaces');

const {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne,
} = require('../controllers/reviews');

const {
  eventsList,
  eventsCreateOne,
  eventsReadOne,
  eventsUpdateOne,
  eventsDeleteOne,
} = require('../controllers/events');

const { register, login } = require('../controllers/authentication');

const {
  usersList,
  usersReadOne,
  usersUpdateOne,
  usersDeleteOne,
} = require('../controllers/users');

const {
  allNotifications,
  createNotification,
  updateNotification,
  deleteNotification
} = require ('../controllers/NotificationController')

const {
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
} = require('../controllers/ChatController.js');

const {
  createDeveloperReview,
  getDeveloperReview,
} = require ('../controllers/developerController')

const {
  createEventReview,
  updateEventRating,
} = require ('../controllers/EventReviewController')

const { default: DeveloperReview } = require('../models/developer-review');

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

// spaces
router
  .route('/spaces')
  .get(spacesListByDistance)
  .post( spacesCreate);

router
  .route('/spaces/:spaceid')
  .get(spacesReadOne)
  .put( spacesUpdateOne)
  .delete( spacesDeleteOne);

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

// auth
router.post('/register', register);
router.post('/login', login);

// users
router
  .route('/users')
  .get(usersList)

router
  .route('/users/:userid')
  .get(usersReadOne)
  .put( usersUpdateOne)
  .delete( usersDeleteOne);

//Notifications
router
  .route('/user/:userid/notifications')
  .get(allNotifications)

router
  .route('/user/:userid/notifications/:notificationid')
  .post(createNotification)
  .put(updateNotification)
  .delete(deleteNotification);


//Chat
router
  .route('/user/:userid/chats')
  .get(getMessages)

router
  .route('/user/:userid/chats/:chatid')
  .post(createMessage)
  .put(updateMessage)
  .delete(deleteMessage);

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

module.exports = router;
