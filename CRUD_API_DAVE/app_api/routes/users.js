import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import { hashPassword, comparePassword } from '../middleware/encryption.js';

const router = express.Router();

// Authenticate user with email and password
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user with the given email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare password hash
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const accessToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ accessToken });
  } catch (error) {
    return next(error);
  }
});

// Create a new user account
router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user in database
    const user = await User.create({ email, password: hashedPassword });

    // Generate JWT token
    const accessToken = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(201).json({ accessToken });
  } catch (error) {
    return next(error);
  }
});

export default router;
