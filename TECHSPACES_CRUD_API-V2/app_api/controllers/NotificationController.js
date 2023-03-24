const moongose = require('mongoose');
const Notification = moongose.model('Notifications');

// get all notifications for a user
const allNotifications = async (req, res) => {
  const userId = req.params.userId;
  try {
    const notifications = await Notification.find({ user_id: userId }).populate('sender_id').populate('event_id').populate('friendRequestId');
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// create a new notification
const createNotification =  async (req, res) => {
  const { id, user_id, type, message, sender_id, event_id, friendRequestId } = req.body;
  const notification = new Notification({
    id,
    user_id,
    type,
    message,
    sender_id,
    event_id,
    friendRequestId
  });
  try {
    const newNotification = await notification.save();
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// update a notification's read status
const updateNotification = async (req, res) => {
  const id = req.params.id;
  try {
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    notification.is_read = true;
    const updatedNotification = await notification.save();
    res.json(updatedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// delete a notification
const deleteNotification = async (req, res) => {
  const id = req.params.id;
  try {
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    await notification.remove();
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
    allNotifications,
    createNotification,
    updateNotification,
    deleteNotification
};
