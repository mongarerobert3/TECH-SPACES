const express = require('express');
const router = express.Router();
const ctrlSpaces = require('../controllers/spaces');
const ctrlOthers = require('../controllers/others');

router.get('/', ctrlSpaces.homelist);
router.get('/space', ctrlSpaces.spaceInfo);
router.get('/space/review/new', ctrlSpaces.addReview);

router.get('/about', ctrlOthers.about);

module.exports = router;
