/**
 * hii itavuta review zote
 */

const express = require('express');
const router = express.Router();

const spaceReviewRoutes = require('./space-review');
const developerReviewRoutes = require('./developer-review');
const eventReviewRoutes = require('./event-review');

router.use('/space', spaceReviewRoutes);
router.use('/developer', developerReviewRoutes);
router.use('/event', eventReviewRoutes);

export default router;
