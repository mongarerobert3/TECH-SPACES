const mongoose = require('mongoose');

const Spac = mongoose.model('Space');

const getAuthor = async (req) => {
  try {
    if (req.payload && req.payload.email) {
      const user = await User.findOne({ email: req.payload.email }).exec();
      if (!user) {
        throw new Error('User not found');
      }
      return user.name;
    } else {
      throw new Error('User not found');
    }
  } catch (err) {
    throw err;
  }
};

const doSetAverageRating = async (space) => {
  if (space.reviews && space.reviews.length > 0) {
    const count = space.reviews.length;
    const total = space.reviews.reduce((acc, { rating }) => {
      return acc + rating;
    }, 0);

    space.rating = parseInt(total / count, 10);
    await space.save();
    console.log(`Average rating updated to ${space.rating}`);
  }
};

const updateAverageRating = async (spaceId) => {
  try {
    const space = await Spac.findById(spaceId).select('rating reviews');
    if (space) {
      await doSetAverageRating(space);
    }
  } catch (err) {
    console.log(err);
  }
};
// add author aurg
const doAddReview = async (req, res, space) => {
  if (!space) {
    return res.status(404).json({ message: 'space not found' });
  }
// change by removin author
  const { author, rating, reviewText } = req.body;
  space.reviews.push({ author, rating, reviewText });
  try {
    await space.save();
    await updateAverageRating(space._id);
    const thisReview = space.reviews.slice(-1).pop();
    res.status(201).json(thisReview);
  } catch (err) {
    res.status(400).json(err);
  }
};

const reviewsCreate = async (req, res) => {
  try {
    //const username = await getAuthor(req);
    // remember to change do review to take username as param
    const spaceId = req.params.spaceid;
    if (spaceId) {
      const space = await Spac.findById(spaceId).select('reviews');
      if (!space) {
        return res.status(404).json({ message: 'space not found' });
      }
      doAddReview(req, res, space);
    } else {
      res.status(404).json({ message: 'space not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
};

const reviewsReadOne = async (req, res) => {
  try {
    const space = await Spac.findById(req.params.spaceid).select('name reviews');
    if (!space) {
      return res.status(404).json({ message: 'space not found' });
    }

    if (space.reviews && space.reviews.length > 0) {
      const review = space.reviews.id(req.params.reviewid);

      if (!review) {
        return res.status(404).json({ message: 'review not found' });
      }

      const response = {
        space: { name: space.name, id: req.params.spaceid },
        review,
      };

      return res.status(200).json(response);
    } else {
      return res.status(404).json({ message: 'No reviews found' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const reviewsUpdateOne = async (req, res) => {
  try {
  const { spaceid, reviewid } = req.params;
  if (!spaceid || !reviewid) {
  return res.status(404).json({ message: "Not found, spaceid and reviewid are both required" });
  }
  const space = await Spac.findById(spaceid).select("reviews");
if (!space) {
  return res.status(404).json({ message: "space not found" });
}

const thisReview = space.reviews.id(reviewid);
if (!thisReview) {
  return res.status(404).json({ message: "Review not found" });
}

thisReview.author = req.body.author;
thisReview.rating = req.body.rating;
thisReview.reviewText = req.body.reviewText;
await space.save();

updateAverageRating(space._id);
res.status(200).json(thisReview);
} catch (err) {
  res.status(400).json(err);
  }
  };
  
const reviewsDeleteOne = async (req, res) => {
  try {
    const { spaceid, reviewid } = req.params;
      if (!spaceid || !reviewid) {
    return res.status(404).json({ message: "Not found, spaceid and reviewid are both required" });
  }
  const space = await Spac.findById(spaceid).select("reviews");
  if (!space) {
  return res.status(404).json({ message: "space not found" });
  }
  const review = space.reviews.id(reviewid);
  if (!review) {
  return res.status(404).json({ message: "Review not found" });
  }

  review.remove();
  await space.save();

  updateAverageRating(space._id);
  res.status(204).send('Review Deleted');
  } catch (err) {
  res.status(400).json(err);
  }
  };
  
module.exports = {
  reviewsCreate,
  reviewsReadOne,
  reviewsUpdateOne,
  reviewsDeleteOne,
};