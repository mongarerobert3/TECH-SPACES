import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import { Strategy as Auth0Strategy } from 'passport-auth0';

import http from 'http';
import routes from './routes/routes.js';
import { MONGODB_URI, PORT, SESSION_SECRET, AUTH_CONFIG } from './config.js';
import db from './db.js';
import { initSocket } from './socket.js';

const app = express();
const server = http.createServer(app);
const io = initSocket(server);

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS middleware
app.use(cors());

// morgan middleware
app.use(morgan('dev'));

// configure express session
app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

// configure passport
app.use(passport.initialize());
app.use(passport.session());

// configure passport Auth0 strategy
passport.use(new Auth0Strategy(AUTH_CONFIG, (accessToken, refreshToken, extraParams, profile, done) => {
  return done(null, profile);
}));

// serialize user to session
passport.serializeUser((user, done) => {
  done(null, user);
});

// deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// Use routes
app.use('/api', routes);

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Initialize db
db();

// Start server
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
