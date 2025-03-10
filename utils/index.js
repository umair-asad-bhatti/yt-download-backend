const jwt = require('jsonwebtoken');
function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}
const SECRET_ACCESS = process.env.ACCESS_TOKEN_SECRET; // Keep this secret (use .env)
const SECRET_REFRESH = process.env.REFRESH_TOKEN_SECRET; // Keep this secret (use .env)

// Function to generate Access Token
const generateAccessToken = (user, secret) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_ACCESS, {
    expiresIn: '3h',
  }); // Short expiry
};

// Function to generate Refresh Token
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_REFRESH, {
    expiresIn: '7d',
  }); // Longer expiry
};

const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, SECRET_ACCESS); // Returns decoded payload if valid
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return { error: 'Access token expired' };
    } else {
      return { error: 'Invalid access token' };
    }
  }
};

// Function to validate Refresh Token
const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, SECRET_REFRESH); // Returns decoded payload if valid
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return { error: 'Refresh token expired' };
    } else {
      return { error: 'Invalid refresh token' };
    }
  }
};

const decodeToken = (token) => {
  return jwt.decode(token);
};
module.exports = {
  validateEmail,
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
};
