// id: a unique identifier for the event document
// title: string (the title of the event) required
// Description: string (a brief description of the event)
//  start_time: the date and time when the event starts
// end_time: the date and time when the event ends
// location: the location where the event will take place
// creator: a reference to the user who created the event
// attendees: a list of references to the users who are attending the event
// max_attendees: the maximum number of attendees allowed for the event
// created_at: the date and time when the event document was created
// updated_at: the date and time when the event document was last updated


const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  start_time: {
    type: String,
    // required: true
  },
  end_time: {
    type: String,
    // required: true
  },
  location: {
    type: String,
    // required: true
  },
  // creator: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  // attendees: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User'
  // }],
  max_attendees: {
    type: Number,
    required: true,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('Event', eventSchema);
