import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import uploads from './fileUpload';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
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
    let businessImageUrl;
    if (req.file) {
      cloudinary.v2.uploader.upload(req.file.path, (error, result) => {
        if (error) {
          const validationErrors = ['An Error Occured uploading image'];
          return res.status(400).json({ message: 'Cannot Complete Request Errors Occured', validationErrors });
        }
        businessImageUrl = result.secure_url;
        req.businessImage = businessImageUrl;
        next(err);
      });
    } else {
      next(err);
    }
  });
};

export default isValidFile;
