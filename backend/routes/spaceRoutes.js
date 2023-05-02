const express = require("express");
const {
  spacesListByDistance,
  spacesCreate,
  spacesReadOne,
  spacesUpdateOne,
  spacesDeleteOne,
  spacesSearch,
} = require("../controllers/spaces");

const {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne,
} = require("../controllers/reviews");


const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


/*--------------------------SPACES-----------------------*/


// Route for creating a new space
router.route("/").post(protect, spacesCreate);

// Route for searching for a space by name or location
router.route("/search").get(protect, spacesSearch);

// Route for getting a single space by ID
router.route("/:spaceid").get(protect, spacesReadOne);

// Route for updating a space by ID
router.route("/:spaceid").put(protect, spacesUpdateOne);

// Route for deleting a space by ID
router.route("/:spaceid").delete(protect, spacesDeleteOne);

// Route for listing spaces by distance from a given location
router.route("/distances/:lng/:lat").get(protect, spacesListByDistance);


/*--------------------------REVIEWS-----------------------*/


// Route for creating a review
router.route("/:spaceid/review").post(protect, reviewsCreate);

// Route for reading one review
router.route("/:spaceid/review").get(protect, reviewsReadOne);

// Route for Updating a review
router.route("/:spaceid/review").put(protect, reviewsUpdateOne);

// Route for deleting a review
router.route("/:spaceid/review").post(protect, reviewsDeleteOne);

module.exports = router;
