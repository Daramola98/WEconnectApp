import { Business } from '../models';
import businessMessages from '../messages/businessMessages';
import serverErrorMessage from '../messages/serverMessage';
import { handleInputFormat } from './genericHelper';

/**
   * Filter businesses in the database by the provided category
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} res - The response to the client
   * @memberof BusinessHelper
   */
export const findBusinessByCategory = (req, res) => {
  const searchCategory = req.query.category.replace(/ /g, '');
  return Business
    .findAll({
      where: {
        category: {
          ilike: `%${searchCategory}%`
        }
      }
    })
    .then((business) => {
      if (business.length > 0) {
        return res.status(200)
          .json({ message: businessMessages.businessFoundMessage, business });
      }
      if (business.length === 0) {
        return res.status(404).json(businessMessages.businessNotFoundInCategoryMessage);
      }
    })
    .catch(err => res.status(500).json(serverErrorMessage.message));
};

  /**
   * Filter businesses in the database by the provided location
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} res - The response to the client
   * @memberof BusinessHelper
   */
export const findBusinessByLocation = (req, res) => {
  const searchLocation = req.query.location.replace(/ /g, '');
  return Business
    .findAll({
      where: {
        location: {
          ilike: `%${searchLocation}%`
        }
      }
    })
    .then((business) => {
      if (business.length > 0) {
        return res.status(200)
          .json({ message: businessMessages.businessesFoundMessage, business });
      }
      res.status(404).json(businessMessages.businessNotFoundInLocationMessage);
    })
    .catch(err => res.status(500).json(serverErrorMessage.message));
};

  /**
   * Filter businesses in the database by the provided location and category
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} res - The response to the client
   * @memberof BusinessHelper
   */
export const findBusinessByLocationAndCategory = (req, res) => {
  const searchCategory = req.query.category.replace(/ /g, '');
  const searchLocation = req.query.location.replace(/ /g, '');
  return Business
    .findAll({
      where: {
        location: {
          ilike: `%${searchLocation}%`
        },
        category: {
          ilike: `%${searchCategory}%`
        }
      }
    })
    .then((business) => {
      if (business.length > 0) {
        return res.status(200)
          .json({ message: businessMessages.businessFoundMessage, business });
      }
      return res.status(404).json(businessMessages.businessNotFoundMessage);
    })
    .catch(err => res.status(500).json(serverErrorMessage.message));
};

