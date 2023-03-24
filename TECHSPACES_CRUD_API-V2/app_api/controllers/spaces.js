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

    const spaces = results.map(result => ({
      _id: result._id,
      name: result.name,
      address: result.address,
      rating: result.rating,
      facilities: result.facilities,
      distance: `${result.distance.calculated.toFixed()}m`
    }));

    res.status(200).json(spaces);
  } catch (err) {
    console.error(err.message);
    res.status(404).json(err);
  }
};

const spacesCreate = (req, res) => {
  const {
    name,
    address,
    facilities,
    lng,
    lat,
    days1,
    opening1,
    closing1,
    closed1,
    days2,
    opening2,
    closing2,
    closed2
  } = req.body;

  Spac.create({
    name,
    address,
    facilities: facilities.toString().split(","),
    coords: {
      type: "Point",
      coordinates: [
        parseFloat(lng),
        parseFloat(lat)
      ]
    },
    openingTimes: [
      {
        days: days1,
        opening: opening1,
        closing: closing1,
        closed: closed1
      },
      {
        days: days2,
        opening: opening2,
        closing: closing2,
        closed: closed2
      }
    ]
  })
    .then(space => {
      res.status(201).json(space);
    })
    .catch(err => {
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

const spacesUpdateOne = async (req, res) => {
  try {
    const { spaceid } = req.params;
    if (!spaceid) {
      return res.status(404).json({ message: "Not found, spaceid is required" });
    }
    const space = await Spac.findById(spaceid).select("-reviews -rating");
    if (!space) {
      return res.status(404).json({ message: "spaceid not found" });
    }
    space.name = req.body.name;
    space.address = req.body.address;
    if (req.body.facilities) {
      space.facilities = req.body.facilities.split(",");
    }
    if (req.body.lng && req.body.lat) {
      space.coords = { type: "Point", coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)] };
    }
    space.openingTimes = [      { days: req.body.days1, opening: req.body.opening1, closing: req.body.closing1, closed: req.body.closed1 },      { days: req.body.days2, opening: req.body.opening2, closing: req.body.closing2, closed: req.body.closed2 },    ];
    const updatedSpace = await space.save();
    res.status(200).json(updatedSpace);
  } catch (err) {
    console.error(err.message);
    res.status(404).json(err);
  }
};

const spacesDeleteOne = async (req, res) => {
  try {
    const { spaceid } = req.params;
    if (!spaceid) {
      return res.status(404).json({ message: "No space" });
    }
    const space = await Spac.findByIdAndRemove(spaceid);
    if (!space) {
      return res.status(404).json(err);
    }
    res.status(204).send('Space Deleted');
  } catch (err) {
    res.status(404).json(err);
  }
};


module.exports = {
  spacesListByDistance,
  spacesCreate,
  spacesReadOne,
  spacesUpdateOne,
  spacesDeleteOne
};

