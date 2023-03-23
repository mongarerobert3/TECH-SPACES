import passport from 'passport';
import Auth0Strategy from 'passport-auth0';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';

dotenv.config();

// Configure Passport to use Auth0
const strategy = new Auth0Strategy(
  {
    domain: 'dev-fu78t5pi0oxgadcn.us.auth0.com',
    clientID: 'yTNY4ITHnUMaSn4mKPFSapRivJ6VMie5',
    clientSecret: 'RxuCcXU6W_nkkO7dwqgPxJblQwwk72uz9qkcWeRz1YMzy9TppMZgMRbZ-deIXcld',
    callbackURL: '/callback',
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // This function is called when a user authenticates with Auth0
    // You can use this function to save user data to your database, or retrieve existing data
    return done(null, profile);
  }
);

// Set up serialization and deserialization functions
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Configure Passport to use JWT strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwt_payload, done) {
      // This function is called when a user authenticates with JWT
      // You can use this function to verify user data in the JWT payload and retrieve additional user data from your database
      return done(null, jwt_payload);
    }
  )
);

// Define middleware to check if user is authenticated with JWT
function ensureAuthenticatedWithJwt(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }
    req.user = user;
    next();
  })(req, res, next);
}

export { ensureAuthenticatedWithJwt, passport };
