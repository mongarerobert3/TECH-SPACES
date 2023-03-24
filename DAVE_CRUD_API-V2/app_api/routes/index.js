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
  .post(auth, spacesCreate);

router
  .route('/spaces/:spaceid')
  .get(spacesReadOne)
  .put(auth, spacesUpdateOne)
  .delete(auth, spacesDeleteOne);

// reviews
router
  .route('/spaces/:spaceid/reviews')
  .post(auth, reviewsCreate);

router
  .route('/spaces/:spaceid/reviews/:reviewid')
  .get(reviewsReadOne)
  .put(auth, reviewsUpdateOne)
  .delete(auth, reviewsDeleteOne);

// events
router
  .route('/events')
  .get(eventsList)
  .post(auth, eventsCreateOne);

router
  .route('/events/:eventid')
  .get(eventsReadOne)
  .put(auth, eventsUpdateOne)
  .delete(auth, eventsDeleteOne);

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
  .put(auth, usersUpdateOne)
  .delete(auth, usersDeleteOne);

module.exports = router;
