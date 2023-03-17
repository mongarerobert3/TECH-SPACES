import express from 'express';
import ChatMessage from '../models/chat-message';

const router = express.Router();

// GET all chat messages
router.get('/', async (req, res) => {
  try {
    const messages = await ChatMessage.find();
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET a single chat message by ID
router.get('/:id', async (req, res) => {
  try {
    const message = await ChatMessage.findById(req.params.id);
    if (!message) return res.status(404).json({ msg: 'Message not found' });
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST a new chat message
router.post('/', async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const newMessage = new ChatMessage({ from, to, message });
    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT an updated chat message
router.put('/:id', async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const messageToUpdate = await ChatMessage.findById(req.params.id);
    if (!messageToUpdate) return res.status(404).json({ msg: 'Message not found' });
    messageToUpdate.from = from ?? messageToUpdate.from;
    messageToUpdate.to = to ?? messageToUpdate.to;
    messageToUpdate.message = message ?? messageToUpdate.message;
    await messageToUpdate.save();
    res.json(messageToUpdate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE a chat message
router.delete('/:id', async (req, res) => {
  try {
    const messageToDelete = await ChatMessage.findByIdAndDelete(req.params.id);
    if (!messageToDelete) return res.status(404).json({ msg: 'Message not found' });
    res.json({ msg: 'Message deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

export default router;
