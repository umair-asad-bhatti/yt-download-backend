const { verifyAccessToken, verifyRefreshToken } = require('../utils/index');
const validateRequestBody = (req, res, next) => {
  if (
    req.method === 'POST' &&
    (!req.body || Object.keys(req.body).length === 0)
  ) {
    return res.status(400).json({ error: 'Request body is required' });
  }
  next(); // Proceed if body exists
};

const validateAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get Authorization header

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
  const { error, payload } = verifyAccessToken(token); // Validate token

  if (error) {
    return res.status(401).json({ error }); // Return error response if invalid
  }

  req.token = token; // Attach raw token to request for easy access

  next(); // Proceed to the next middleware or route
};

module.exports = validateAccessToken;

module.exports = { validateRequestBody, validateAccessToken };
