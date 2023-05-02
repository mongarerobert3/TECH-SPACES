const expressAsyncHandler = require("express-async-handler");
const Space = require("../models/spaces")
const generateToken = require("../config/generateToken");

//@description     List Spaces by Distabce
//@route           GET /api/space/
//@access          Public
const spacesListByDistance = expressAsyncHandler(async (req, res) => {
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
    const results = await Space.aggregate([
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
});

//@description     Register new space
//@route           POST /api/space/
//@access          Public
const spacesCreate = expressAsyncHandler(async (req, res) => {
  const {
    name,
    address,
    rating,
    facilities,
    coords,
    openingTimes,
    reviews,
    images,  
  } = req.body;


  if (!name || !address ||!rating ||!facilities ||!coords ||!openingTimes ||!reviews ||!images )
  {
    res.status(400);
    throw new Error("Please enter all the fields");
  }



  const user = req.user; // extract the authenticated user from the request object

  if (!user) {
    res.status(401);
    throw new Error("Not authorized, no user found");
  }

  const spaceExists = await Space.findOne({ address });

  if (spaceExists) {
    res.status(400);
    throw new Error("Space already exists");
  }

  const space = await Space.create({
    name,
    address,
    rating,
    facilities,
    coords,
    openingTimes,
    reviews,
    images,
    user: user._id // associate the new space with the authenticated user
  });

  if (space) {
    res.status(201).json({
      _id: space._id,
      name: space.name,
      address: space.address,
      rating: space.rating,
      facilities: space.facilities,
      coords: space.coords,
      openingTimes: space.openingTimes,
      reviews: space.reviews,
      images: space.images,
      user: user._id, // include the user id in the response
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Space not found");
  }
});

//@description     Search a Space
//@route           GET /api/space/search
//@access          Public
const spacesSearch = expressAsyncHandler(async (req, res) => {
  try {
    const { query } = req.query;

    if (typeof query !== 'string') {
      throw new Error('Query parameter must be a string');
    }

    const spaces = await Space.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        //check the implementation of search by address
        { $address: { $search: query } }
      ]
    });

    if(!spaces.length) {
      res.status(404);
      throw new Error("No spaces found");
    }

    console.log(`Found ${spaces.length} spaces matching query ${query}`);
    res.status(200).json({
      spaces
    });
  } catch (error) {
    console.log("Error in spacesSearch function: ", error);
    res.status(404).send(error.message);
    return;
  }
});

//@description     Find a Space
//@route           GET /api/space/:spaceid
//@access          Public

const spacesReadOne = expressAsyncHandler(async (req, res) => {

  try {
    const space = await Space.findById(req.params._id);
 
    if(!space) {
      res.status(404);
      throw new Error("Space not found");
    }

    console.log("Finished executing spacesReadOne function");
    res.status(200);

  } catch (error) {
    console.log("Error in spacesReadOne function: ", error);
    res.status(404).json({ message: error.message });
  }
});

//@description     Update a Space
//@route           PUT /api/space/:spaceid
//@access          Public
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

//@description     Delete a Space
//@route           DELETE /api/space/:spaceid
//@access          Public
const spacesDeleteOne = expressAsyncHandler(async (req, res) => {
  try {
    const spaceid = req.params.spaceid;
    if (!spaceid) {
      return res.status(404).json({ message: "No space" });
    }
    const space = await Space.findByIdAndRemove(spaceid);
    if (!space) {
      return res.status(404).json({ message: "Space not found" });
    }
    res.status(204).json({ message: "Space deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = {
  spacesListByDistance,
  spacesCreate,
  spacesSearch,
  spacesReadOne,
  spacesUpdateOne,
  spacesDeleteOne,
};

