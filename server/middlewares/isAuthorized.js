import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
   * Checks for Authentication before processing protected routes
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - The callback to move to the next middleware
   * @return {object} res - The response to the client
   * @memberof Authentication
   */
const isAuthorized = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};

export default isAuthorized;
