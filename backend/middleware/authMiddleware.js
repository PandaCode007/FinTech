const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fintech-super-secret-key-12345';

module.exports = (roleRequired = 'user') => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization denied. Token missing.' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      
      if (roleRequired === 'admin' && decoded.role !== 'admin') {
        return res.status(403).json({ message: 'Access forbidden. Admin role required.' });
      }

      req.user = decoded; // Contains user_id or admin_id, and role
      next();
    } catch (error) {
      console.error('JWT Token Verification Error:', error.message);
      return res.status(401).json({ message: 'Token is invalid or expired.' });
    }
  };
};
