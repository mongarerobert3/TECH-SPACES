import passport from 'passport';
import Auth0Strategy from 'passport-auth0';

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

// Use the Auth0 strategy with passport
passport.use(strategy);

// Define middleware to check if user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}

export { ensureAuthenticated, passport };
