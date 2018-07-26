import dotenv from 'dotenv';
import { ContactUs } from '../models';
import serverErrorMessage from '../messages/serverMessage';
import { handleInputFormat, handleValidationErrors } from '../helpers/genericHelper';

dotenv.config();

/**
   * Adds contact message to the contact database
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} res - The response to the client
   */
export const addContactInfo = (req, res) => {
  handleInputFormat(req);
  const {
    firstname, lastname, email, message
  } = req.body;
  const contactInfo = {
    firstname,
    lastname,
    email,
    message
  };
  return ContactUs.create(contactInfo)
    .then(result => res.status(201).json({ message: 'Submitted', result }))
    .catch((err) => {
      const { errors } = err;
      if (errors) {
        handleValidationErrors(errors, res);
      } else {
        return res.status(500).json(serverErrorMessage.message);
      }
    });
};

/**
   * Gets a list of contactUs messages in the database
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} res - The response to the client
   */
export const getContactUsMessages = (req, res) => {
  if (req.userData.email !== process.env.ADMIN_CREDENTIAL) {
    return res.status(403).json({ message: 'You are not allowed to perform this operation' });
  }
  return ContactUs.findAll()
    .then((result) => {
      if (result.length < 1) {
        return res.status(404).json({ message: 'No messages' });
      }
      return res.status(200).json(result);
    })
    .catch(err => res.status(500).json(serverErrorMessage.message));
};

