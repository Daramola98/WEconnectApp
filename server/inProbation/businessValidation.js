import Sequelize from 'sequelize';
import { Business } from '../models';
import businessMessages from '../messages/businessMessages';
import serverErrorMessage from '../messages/serverMessage';
import { handleInputFormat } from '../helpers/genericHelper';

const { Op } = Sequelize;

/**
   * Checks if a business with same name or email exists in the database before accepting it
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - The response object
   * @return {object} next to move to the next middleware
   * @memberof BusinessHelper
   */
export const businessValidation = (req, res, next) => {
  let inputEmail, inputName;

  handleInputFormat(req);

  if (req.body.email && req.body.name) {
    inputEmail = req.body.email;
    inputName = req.body.name;
  }
  return Business
    .findOne({
      where: {
        [Op.or]: [
          {
            email: {
              ilike: inputEmail
            }
          },
          {
            name: {
              ilike: inputName
            }
          }
        ]
      }
    })
    .then((business) => {
      if (!business) {
        return next();
      }
      if (business.dataValues.email.replace(/ /g, '') === inputEmail && business.dataValues.name.replace(/ /g, '') === inputName.replace(/ /g, '')) {
        return res.status(409).json({ message: 'Business with same name and email address already exists' });
      }
      if (business.dataValues.name.replace(/ /g, '') === inputName.replace(/ /g, '')) {
        return res.status(409).json({ message: 'Business with same name already exists' });
      }
      if (business.dataValues.email.replace(/ /g, '') === inputEmail) {
        return res.status(409).json({ message: 'Business with same email address already exists' });
      }
      next();
    })
    .catch(err => res.status(500).json(serverErrorMessage.message));
};

  /**
   * check if business with id exists in the database
   * @param {object} req - The request object
   * @param {object} res - The request object
   * @param {object} next - The request object
   * @return {object} next to move to the next middleware
   * @memberof BusinessHelper
   */
export const checkIfBusinessWithIdExists = (req, res, next) => {
  Business
    .findOne({
      where: {
        id: req.params.businessId
      }
    })
    .then((business) => {
      if (!business) {
        return res.status(404).json({ message: 'Business with specified id not found' });
      }
      next();
    })
    .catch(err => res.status(500).json(serverErrorMessage.message));
};

/**
   * Filter businesses in the database by the provided location
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - callback function to move to next middleware
   * @return {object} res - The response to the client
   * @memberof userMiddleware
   */
export const businessExists = (req, res, next) => {
  handleInputFormat(req);
  if (req.body.name && !req.body.email) {
    return Business
      .find({
        where: {
          name: {
            ilike: req.body.name
          }
        }
      })
      .then((business) => {
        if (business) {
          res.status(409).json({ message: 'Business Name already exists' });
        } else {
          next();
        }
      })
      .catch(err => res.status(500).json(serverErrorMessage.message));
  }
  if (req.body.email && !req.body.name) {
    return Business
      .find({
        where: {
          email: {
            ilike: req.body.email
          }
        }
      })
      .then((business) => {
        if (business) {
          res.status(409).json({ message: 'Email already exists' });
        } else {
          next();
        }
      })
      .catch(err => res.status(500).json(serverErrorMessage.message));
  }
};
