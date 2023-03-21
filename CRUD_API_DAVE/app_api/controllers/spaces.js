const mongoose = require('mongoose');
const Spac = mongoose.model('Space');

const spacesListByDistance = async (req, res) => {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const near = {
    type: "Point",
    coordinates: [lng, lat]
  };
  const geoOptions = {
    distanceField: "distance.calculated",
    key: 'coords',
    spherical: true,
    maxDistance: 20000,
  };
  if (!lng || !lat) {
    return res
      .status(404)
      .json({ "message": "lng and lat query parameters are required" });
  }

  try {
    const results = await Spac.aggregate([
      {
        $geoNear: {
          near,
          ...geoOptions
        }
      },
      {
        $limit: 10
      }
    ]);

    const spaces = results.map(result => {
      return {
        _id: result._id,
        name: result.name,
        address: result.address,
        rating: result.rating,
        facilities: result.facilities,
        distance: `${result.distance.calculated.toFixed()}m`
      }
    });

    res.status(200).json(spaces);
  } catch (err) {
    console.error(err.message);
    res.status(404).json(err);
  }
};
const spacesCreate = (req, res) => {
  Spac.create({
    name: req.body.name,
    address: req.body.address,
    facilities: req.body.facilities.toString().split(","),
    coords: {
      type: "Point",
      coordinates: [
        parseFloat(req.body.lng),
        parseFloat(req.body.lat)
      ]
    },
    openingTimes: [
      {
        days: req.body.days1,
        opening: req.body.opening1,
        closing: req.body.closing1,
        closed: req.body.closed1
      },
      {
        days: req.body.days2,
        opening: req.body.opening2,
        closing: req.body.closing2,
        closed: req.body.closed2
      }
    ]
  })
    .then((space) => {
      res.status(201).json(space);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const spacesReadOne = (req, res) => {
  Spac.findById(req.params.spaceid)
    .exec()
    .then(space => {
      if (!space) {
        return res
          .status(404)
          .json({"message": "space not found"});
      } else {
        return res
          .status(200)
          .json(space);
      }
    })
    .catch(err => {
      res.status(404).json(err);
    });
};

const spacesUpdateOne = (req, res) => {
  if (!req.params.spaceid) {
    return res
      .status(404)
      .json({
        "message": "Not found, spaceid is required"
      });
  }
  Spac.findById(req.params.spaceid)
    .select('-reviews -rating')
    .then((space) => {
      if (!space) {
        return res
          .status(404)
          .json({
            "message": "spaceid not found"
          });
      }
      space.name = req.body.name;
      space.address = req.body.address;
      if (req.body.facilities) {
         space.facilities = req.body.facilities.split(',');
      }
      if (req.body.lng && req.body.lat) {
        space.coords ={ type: 'Point', coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]};
      }
      space.openingTimes = [{days: req.body.days1, opening: req.body.opening1, closing: req.body.closing1, closed: req.body.closed1}, { days: req.body.days2, opening: req.body.opening2, closing: req.body.closing2, closed: req.body.closed2 }];
      return space.save();
    })
    .then(spac => {
      res.status(200).json(spac);
    })
    .catch(err => {
      console.error(err.message);
      res.status(404).json(err);
    });
};

const spacesDeleteOne = (req, res) => {
  const { spaceid } = req.params;
  if (spaceid) {
    Spac.findByIdAndRemove(spaceid)
      .then(space => {
        if (!space) {
          return res.status(404).json(err);
        }
        res.status(204).json(null);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  } else {
    res.status(404).json({ "message": "No space" });
  }
};

module.exports = {
  spacesListByDistance,
  spacesCreate,
  spacesReadOne,
  spacesUpdateOne,
  spacesDeleteOne
};

