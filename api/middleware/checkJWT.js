const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });
const tokenKey = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  // Les routes à ignorer pour la vérification du token
  const openRoutes = ['/auth/login', '/auth/register'];

  // Si la route est une des routes ouvertes, passer au middleware suivant
  if (openRoutes.includes(req.originalUrl)) {
    return next();
  }

  // Vérifier si l'en-tête d'autorisation est défini
  if (!req.headers.authorization) {
    console.log('Authorization header missing');
    return res.status(401).json({ message: 'Token non fourni' });
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    console.log('Token missing from authorization header');
    return res.status(401).json({ message: 'Token non fourni' });
  }

  jwt.verify(token, tokenKey, (err, decoded) => {
    if (err) {
      console.log('Token verification failed', err);
      return res.status(401).json({ message: 'Token invalide' });
    }
    req.user = decoded;
    console.log('Token verified successfully', decoded);
    next();
  });
};

module.exports = verifyToken;
