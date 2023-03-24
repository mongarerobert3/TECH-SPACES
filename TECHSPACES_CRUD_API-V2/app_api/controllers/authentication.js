const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const register = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
    });
    user.setPassword(req.body.password);
    await user.save();

    const token = user.generateJwt();
    res.status(200).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(400).json(err);
  }
};

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }
    if (user) {
      const token = user.generateJwt();
      res.status(200).json({ token });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports = {
  register,
  login
}
