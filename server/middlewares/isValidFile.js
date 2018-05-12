import uploads from './fileUpload';

/**
   * Checks for Authentication before processing protected routes
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - The callback to move to the next middleware
   * @return {object} res - The response to the client
   * @memberof Authentication
   */
const isValidFile = (req, res, next) => {
  uploads(req, res, (err) => {
    if (err) {
      return res.status(400).json({ validationErrors: ['File format should be jpeg or png and lower than 3MB'] });
    }
    next(err);
  });
};

export default isValidFile;
