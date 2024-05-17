const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config({path : '.env.local'})
const tokenKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (req.originalUrl === '/auth' ) {
    return next();
  }
  if (!token) {
    return res.status(401).json({ message: 'Token non fourni' });
  }
  jwt.verify(token, tokenKey, (err) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide' });
    }
    next();
  });
};

module.exports = verifyToken; 