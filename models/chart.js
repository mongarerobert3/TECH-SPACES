/**
 * users: An array of the user IDs of the two users involved in the chat.
 *messages: An array of message objects, each containing fields such as sender_id (the user ID of the message sender), 
 *timestamp (the time the message was sent), and content (the text content of the message).
 *last_active: The timestamp of when the chat was last active (i.e. when a message was sent or received).
 *is_active: A boolean indicating whether the chat is currently active (i.e. there are unread messages).
 *archived_by: An array of user IDs indicating which users have archived the chat.
 */

import mongoose from 'mongoose';

const { Schema } = mongoose;

const chartSchema = new Schema({
  users: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    required: true,
  },
  messages: {
    type: [
      {
        sender_id: {
          type: Schema.Types.ObjectId,
          ref: 'User',
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
  last_active: {
    type: Date,
    default: Date.now,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
  archived_by: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  },
});

const Chart = mongoose.model('Chart', chartSchema);

export default Chart;
