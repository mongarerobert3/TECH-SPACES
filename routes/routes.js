import express from 'express';
import spaceRouter from './space-router';
import chatRouter from './chat-router';

const router = express.Router();

// Routes for TechSpaces API
router.use('/spaces', spaceRouter);

// Routes for Chat API
router.use('/chat', chatRouter);

export default router;
