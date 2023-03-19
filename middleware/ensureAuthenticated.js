/**
 * ensures that only the correct person receives intended notifications 
 */

// middleware/ensureAuthenticated.js
export function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
  }
  