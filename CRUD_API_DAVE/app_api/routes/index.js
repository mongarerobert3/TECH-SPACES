const express = require('express');
const router = express.Router();
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

  module.exports = router;