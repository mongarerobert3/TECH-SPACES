const mongoose = require('mongoose');

const User = mongoose.model('User');
// routes

//get list of users
const usersList = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// // create a new user
// const usersCreateOne = (req, res) => {
//   const user = new User({
//     email: req.body.email,
//     name: req.body.name,
//     hash: req.body.hash,
//     salt: req.body.salt,
//     bio: req.body.bio,
//     skills: req.body.skills,
//     location: req.body.location,
//     avatar: req.body.avatar,
//   });

//   user.save((err) => {
//     if (err) {
//       return res.status(500).send(err);
//     }

//     return res.status(201).json(user);
//   });
// };

// read a user by id
const usersReadOne = async (req, res) => {
  try {
    const user = await User.findById(req.params.userid).select('-hash -salt');

    if (!user) {
      return res.status(404).send('User not found');
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).send(err);
  }
};

// update a user by id
const usersUpdateOne = (req, res) => {
  User.findById(req.params.userid, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (!user) {
      return res.status(404).send('User not found');
    }

    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;
    user.bio = req.body.bio || user.bio;
    user.skills = req.body.skills || user.skills;
    user.location = req.body.location || user.location;
    user.avatar = req.body.avatar || user.avatar;

    user.save((err) => {
      if (err) {
        return res.status(500).send(err);
      }

      return res.json(user);
    });
  });
};

// delete a user by id
const usersDeleteOne = (req, res) => {
  User.findByIdAndDelete(req.params.userid, (err, user) => {
    if (err) {
      return res.status(500).send(err);
    }

    if (!user) {
      return res.status(404).send('User not found');
    }

    return res.Send('User deleted');
  });
};

module.exports = {
  usersList,
  usersReadOne,
  usersUpdateOne,
  usersDeleteOne,
}
