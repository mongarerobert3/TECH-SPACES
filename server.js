import express from 'express';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

// import the http module
import http from 'http';

import routes from './routes/routes.js';

import { MONGODB_URI, PORT } from './config.js';
import db from './db.js';

// import the initSocket function from socket.js
import { initSocket } from './socket.js';

const app = express();
const server = http.createServer(app);

// initialize socket connection
initSocket(server);

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS middleware
app.use(cors());

// morgan middleware
app.use(morgan('dev'));

/** 
 * Connect to MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

 * */ 

  
// other server logic here
const io = initSocket(server);

// Initialize db
db();

// Use routes
app.use('/routes', routes);

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
