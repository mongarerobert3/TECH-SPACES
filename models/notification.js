/**
 * id: a unique identifier for the notification
 *user_id: the ID of the user to whom the notification is addressed
 *type: the type of the notification (e.g. "message", "friend request", "event invitation")
 *message: the text of the notification message
 *is_read: a boolean indicating whether the user has already read the notification
 *created_at: the timestamp when the notification was created
 *sender_id: (the ID of the user who sent the notification)
 *eventId: The ID of the event related to the notification 
 *friendRequestId: The ID of the friend request related to the notification.
 */

 import { Schema as _Schema, model } from 'mongoose';

 const notificationSchema = new _Schema({
   id: {
     type: String,
     required: true,
     unique: true
   },
   user_id: {
     type: _Schema.Types.ObjectId,
     ref: 'User',
     required: true
   },
   type: {
     type: String,
     enum: ['message', 'friend_request', 'event_invitation'],
     required: true
   },
   message: {
     type: String,
     required: true
   },
   is_read: {
     type: Boolean,
     default: false
   },
   created_at: {
     type: Date,
     default: Date.now
   },
   sender_id: {
     type: _Schema.Types.ObjectId,
     ref: 'User',
   },
   event_id: {
     type: _Schema.Types.ObjectId,
     ref: 'Event',
   },
   friendRequestId: {
    type: Schema.Types.ObjectId,
    ref: 'FriendRequest',
   },
 });
 
 export default model('Notification', notificationSchema);
