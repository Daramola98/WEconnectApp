import Sequelize from 'sequelize';
import dotenv from 'dotenv';
import { Business } from '../models';
import {
  businessFoundMessage,
  businessesFoundMessage,
  businessNotFoundInLocationMessage,
  businessNotFoundInCategoryMessage,
  businessNotFoundMessage
} from '../messages/businessMessages';
import serverErrorMessage from '../messages/serverMessage';
import { handleInputFormat } from './genericHelper';
import dbConfig from './../config/config';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

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
      where: Sequelize.where(
        Sequelize.cast(Sequelize.col('category'), 'TEXT'),
        { $ilike: `%${searchCategory}%` }
      )
    })
    .then((business) => {
      if (business.length > 0) {
        return res.status(200)
          .json({ message: businessFoundMessage, business });
      }
      if (business.length === 0) {
        return res.status(404).json(businessNotFoundInCategoryMessage);
      }
    })
    .catch(err => res.status(500).json(serverErrorMessage.message));
};

  /**
   * Filter businesses in the database by the provided name
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} res - The response to the client
   * @memberof BusinessHelper
   */
export const findBusinessByName = (req, res) => {
  const searchName = req.query.name.replace(/ /g, '');
  return Business
    .findAll({
      where: {
        name: {
          $ilike: `%${searchName}%`
        }
      }
    })
    .then((businesses) => {
      if (businesses.length > 0) {
        return res.status(200)
          .json({ message: businessesFoundMessage, businesses });
      }
      res.status(404).json({ message: 'No Business found with this name' });
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
      where: Sequelize.where(
        Sequelize.cast(Sequelize.col('location'), 'TEXT'),
        { $ilike: `%${searchLocation}%` }
      )
    })
    .then((business) => {
      if (business.length > 0) {
        return res.status(200)
          .json({ message: businessesFoundMessage, business });
      }
      res.status(404).json(businessNotFoundInLocationMessage);
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
  return sequelize
    .query(`SELECT * FROM "Businesses" AS "Business" WHERE CAST("category" AS TEXT) ILIKE '%${searchCategory}%' AND CAST("location" AS TEXT) ILIKE '%${searchLocation}%'`, { type: sequelize.QueryTypes.SELECT })
    .then((business) => {
      if (business.length > 0) {
        return res.status(200)
          .json({ message: businessFoundMessage, business });
      }
      return res.status(404).json(businessNotFoundMessage);
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
export const listBusinessByPages = (req, res) => {
  let offset;
  const searchPageNumber = Math.round(Number(req.query.pageNumber));
  if (searchPageNumber === 1) {
    offset = 0;
  } else {
    offset = (searchPageNumber - 1) * 10;
  }
  return Business
    .findAll({ offset, limit: 10 })
    .then((business) => {
      if (business.length > 0) {
        return res.status(200)
          .json({ message: businessFoundMessage, business });
      }
      return res.status(404).json(businessNotFoundMessage);
    })
    .catch(err => res.status(500).json(err));
};

