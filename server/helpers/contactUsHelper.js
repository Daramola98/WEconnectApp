import dotenv from 'dotenv';
import { ContactUs } from '../models';
import serverErrorMessage from '../messages/serverMessage';
import { handleInputFormat, handleValidationErrors } from '../helpers/genericHelper';

dotenv.config();

/**
   * Filter businesses in the database by the provided location and category
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} res - The response to the client
   * @memberof BusinessHelper
   */
export const addContactInfo = (req, res) => {
  handleInputFormat(req);
  const contactInfo = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    message: req.body.message
  };
  return ContactUs.create(contactInfo)
    .then(result => res.status(200).json(result))
    .catch((err) => {
      if (err.errors) {
        handleValidationErrors(err.errors, res);
      } else {
        return res.status(500).json(serverErrorMessage.message);
      }
    });
};
/**
   * Filter businesses in the database by the provided location and category
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} res - The response to the client
   * @memberof BusinessHelper
   */
export const getContactUsMessages = (req, res) => {
  if (req.userData.email !== process.env.ADMIN_CREDENTIAL) {
    return res.status(403).json({ message: 'You are not allowed to perform this operation' });
  }
  return ContactUs.findAll()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json(serverErrorMessage.message));
};

