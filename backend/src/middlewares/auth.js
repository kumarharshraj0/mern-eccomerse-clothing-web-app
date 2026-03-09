const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ------------------------------
// VERIFY ACCESS TOKEN
// ------------------------------
const verifyAccessToken = async (req, res, next) => {
  try {
    // Read token from cookie or Authorization header
    const token = req.cookies?.accessToken || req.headers?.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No access token provided' });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    // Get user without password
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user; // attach user to request
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Access token expired', expired: true });
    }
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// ------------------------------
// ROLE-BASED PROTECTION
// ------------------------------
const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Unauthenticated' });

    // Check if user has at least one required role
    if (!req.user.roles || !req.user.roles.some(r => roles.includes(r))) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};

module.exports = { verifyAccessToken, requireRole };


