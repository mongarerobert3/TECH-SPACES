export const MONGODB_URI = 'mongodb://localhost:27017/techSpaces';
export const PORT = process.env.PORT || 5000;
export const SESSION_SECRET = process.env.SESSION_SECRET || 'secret';
export const AUTH_CONFIG = {
  domain: 'dev-fu78t5pi0oxgadcn.us.auth0.com',
  clientID: 'yTNY4ITHnUMaSn4mKPFSapRivJ6VMie5',
  clientSecret: 'RxuCcXU6W_nkkO7dwqgPxJblQwwk72uz9qkcWeRz1YMzy9TppMZgMRbZ-deIXcld',
  callbackURL: 'http://localhost:5000/api/auth/callback'
};
