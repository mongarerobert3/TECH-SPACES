import initSocket from './socket'; // import the socket.js file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./routes/routes');
const { MONGODB_URI, PORT } = require('./config');
const db = require('./db');

const app = express();
const server = http.createServer(app);

// initialize socket connection
initSocket(server);

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS middleware
app.use(cors());

//morgan middleware
app.use(morgan('dev'));

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

//other server logic here
const io = initSocket(server);

// Initialize db
db();

// Use routes
app.use('/api', routes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
