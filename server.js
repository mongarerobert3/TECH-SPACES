import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import { Strategy as Auth0Strategy } from 'passport-auth0';

import http from 'http';

//routes middleware
import routes from './routes/routes.js';

//reviews middleware
import reviewsRoutes from './routes/reviews.js';

import { PORT, SESSION_SECRET, AUTH_CONFIG } from './config.js';
import db from './db.js';
import { initSocket } from './socket.js';
import './auth/passport.js';
import dotenv from 'dotenv';

dotenv.config();

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

// Middleware to handle passport authentication errors
app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
  next();
});

// Middleware to check if user is authenticated with JWT
function ensureAuthenticatedWithJwt(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized'
      });
    }
    req.user = user;
    next();
  })(req, res, next);
}

// Use routes
app.use('/api', routes);

// Use the reviews middleware
app.use('/reviews', reviewsRoutes);

// Initialize db
db();

// Start server
server.listen(PORT, () => console.log('Server running on port ' + PORT));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Error:', err.message);
  console.error('Shutting down server due to unhandled promise rejection');
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Error:', err.message);
  console.error('Shutting down server due to uncaught exception');
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM signal
process.on('SIGTERM', () => {
  console.log('Received SIGTERM signal');
  server.close(() => {
    console.log('Server shut down gracefully');
  });
});
