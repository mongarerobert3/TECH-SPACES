/**
 * id: a unique identifier for the event document
* title: string (the title of the event) required
* Description: string (a brief description of the event)
* start_time: the date and time when the event starts
* end_time: the date and time when the event ends
* location: the location where the event will take place
* creator: a reference to the user who created the event
* attendees: a list of references to the users who are attending the event
* max_attendees: the maximum number of attendees allowed for the event
* created_at: the date and time when the event document was created
* updated_at: the date and time when the event document was last updated
 */

const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  startTime: {
    type: Date,
    'default': Date.now()
  },
  endTime: {
    type: Date,
    'default': Date.now()
  },
  coords: {
    type: { type: String},
    index: [Number]
  },
  creator: {
    type: String
  },
  attendees: {
    type: [String],
  },
  maxAttendees: {
    type: Number
  },
  createdAt: {
    type: Date,
    'default': Date.now()
  },
  updatedAt: {
    type: Date,
    'default': Date.now()
  }

});