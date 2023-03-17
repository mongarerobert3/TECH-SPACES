import express from 'express';
import chatRouter from './chat-router';

const router = express.Router();

// Routes for TechSpaces API

// Routes for Chat API
router.use('/chat', chatRouter);

export default router;
