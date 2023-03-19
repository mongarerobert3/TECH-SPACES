import express from 'express';
import chatRouter from './chat-router.js';
import { passport } from '../auth/passport.js';
import notificationRouter from './notification-route.js';

const router = express.Router();

// Routes for TechSpaces API

// Routes for Chat API
router.use('/chat', passport.authenticate('jwt', { session: false }), chatRouter);

//Routes for Auth API
// Not needed since passport.js is used for authentication, removed auth-router.js

//Routes for Notification API
router.use('/notifications', passport.authenticate('jwt', { session: false }), notificationRouter);

export default router;
