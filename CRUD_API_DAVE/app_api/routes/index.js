const express = require('express');
const router = express.Router();
const chatRouter = require('./chat-router.js');
const passport = require('../auth/passport.js').passport;
const notificationRouter = require('./notification-route.js');
const ctrlSpaces = require('../controllers/spaces');
const ctrlReviews = require('../controllers/reviews');
const ctrlEvents = require('../controllers/events')

// spaces
router
  .route('/spaces')
  .get(ctrlSpaces.spacesListByDistance)
  .post(ctrlSpaces.spacesCreate);

router
  .route('/spaces/:spaceid')
  .get(ctrlSpaces.spacesReadOne)
  .put(ctrlSpaces.spacesUpdateOne)
  .delete(ctrlSpaces.spacesDeleteOne);

// reviews
router
  .route('/spaces/:spaceid/reviews')
  .post(ctrlReviews.reviewsCreate);

router
  .route('/spaces/:spaceid/reviews/:reviewid')
  .get(ctrlReviews.reviewsReadOne)
  .put(ctrlReviews.reviewsUpdateOne)
  .delete(ctrlReviews.reviewsDeleteOne);

// events

router
  .route('/events')
  .get(ctrlEvents.eventsList)
  .post(ctrlEvents.eventsCreateOne);

router
  .route('/events/:eventid')
  .get(ctrlEvents.eventsReadOne)
  .put(ctrlEvents.eventsUpdateOne)
  .delete(ctrlEvents.eventsDeleteOne);

// Routes for Chat API
router.use('/chat', passport.authenticate('jwt', { session: false }), chatRouter);

//Routes for Auth API
// Not needed since passport.js is used for authentication, removed auth-router.js

//Routes for Notification API
router.use('/notifications', passport.authenticate('jwt', { session: false }), notificationRouter);

  module.exports = router;