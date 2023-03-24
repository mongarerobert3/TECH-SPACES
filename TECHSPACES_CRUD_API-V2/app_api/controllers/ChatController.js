const ChatMessage = require('../models/ChatMessage.js');

const getMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find();
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const getMessageById = async (req, res) => {
  try {
    const message = await ChatMessage.findById(req.params.chatid);
    if (!message) return res.status(404).json({ msg: 'Message not found' });
    res.json(message);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const createMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const newMessage = new ChatMessage({ from, to, message });
    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const updateMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const messageToUpdate = await ChatMessage.findById(req.params.id);
    if (!messageToUpdate) return res.status(404).json({ msg: 'Message not found' });
    messageToUpdate.from = from !== undefined ? from : messageToUpdate.from;
    messageToUpdate.to = to || messageToUpdate.to;
    messageToUpdate.message = message || messageToUpdate.message;
    await messageToUpdate.save();
    return res.json(messageToUpdate); // Return the updated chat message object
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deleteMessage = async (req, res) => {
  try {
    const messageToDelete = await ChatMessage.findByIdAndDelete(req.params.id);
    if (!messageToDelete) return res.status(404).json({ msg: 'Message not found' });
    res.json({ msg: 'Message deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { getMessages, getMessageById, createMessage, updateMessage, deleteMessage };
