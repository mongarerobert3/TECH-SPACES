/** 
 1.  Name: string required
2. Email: string required
3.access_token: str
3. Hashed password required
4. Bio: string
5. Skills: array of strings
6. Location: string
7. Avatar: string
*/
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
  },
  hashePassward: {
    type: String,
    required: true
  },
  Bio: {
    type: String,
  },
  Skills: {
    type: [String]
  },
  coords: {
    type: { type: String},
    index: [Number]
  },
  avatar: {
    type: String
  }
});

userSchema.index({coords: '2dsphere'});

mongoose.model('User', userSchema);
