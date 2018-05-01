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
   * @param {number} offset - The response object
   * @return {object} res - The response to the client
   * @memberof BusinessHelper
   */
export const findBusinessByCategory = (req, res, offset) => {
  const searchCategory = req.query.category.replace(/ /g, '');
  return Business
    .findAndCountAll({
      offset,
      limit: 10,
      where: Sequelize.where(
        Sequelize.cast(Sequelize.col('category'), 'TEXT'),
        { $ilike: `%${searchCategory}%` }
      )
    })
    .then((result) => {
      const businesses = result.rows;
      const businessesCount = result.count;
      if (businesses.length > 0) {
        return res.status(200)
          .json({ message: businessFoundMessage, businesses, businessesCount });
      }
      if (businesses.length === 0) {
        return res.status(404).json(businessNotFoundInCategoryMessage);
      }
    })
    .catch(err => res.status(500).json(serverErrorMessage.message));
};

  /**
   * Filter businesses in the database by the provided name
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {number} offset - The response object
   * @return {object} res - The response to the client
   * @memberof BusinessHelper
   */
export const findBusinessByName = (req, res, offset) => {
  const searchName = req.query.name.replace(/ /g, '');
  return Business
    .findAndCountAll({
      offset,
      limit: 10,
      where: {
        name: {
          $ilike: `%${searchName}%`
        }
      }
    })
    .then((result) => {
      const businesses = result.rows;
      const businessesCount = result.count;
      if (businesses.length > 0) {
        return res.status(200)
          .json({ message: businessFoundMessage, businesses, businessesCount });
      }
      res.status(404).json({ message: 'No Business found with this name' });
    })
    .catch(err => res.status(500).json(serverErrorMessage.message));
};

/**
   * Filter businesses in the database by the provided location
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {number} offset - The response object
   * @return {object} res - The response to the client
   * @memberof BusinessHelper
   */
export const findBusinessByLocation = (req, res, offset) => {
  const searchLocation = req.query.location.replace(/ /g, '');
  return Business
    .findAndCountAll({
      offset,
      limit: 10,
      where: Sequelize.where(
        Sequelize.cast(Sequelize.col('location'), 'TEXT'),
        { $ilike: `%${searchLocation}%` }
      )
    })
    .then((result) => {
      const businesses = result.rows;
      const businessesCount = result.count;
      if (businesses.length > 0) {
        return res.status(200)
          .json({ message: businessFoundMessage, businesses, businessesCount });
      }
      res.status(404).json(businessNotFoundInLocationMessage);
    })
    .catch(err => res.status(500).json(serverErrorMessage.message));
};

  /**
   * Filter businesses in the database by the provided location and category
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {number} offset - The response object
   * @return {object} res - The response to the client
   * @memberof BusinessHelper
   */
export const findBusinessByLocationAndCategory = (req, res, offset) => {
  const searchCategory = req.query.category.replace(/ /g, '');
  const searchLocation = req.query.location.replace(/ /g, '');
  return sequelize
    .query(`SELECT * FROM "Businesses" AS "Business" WHERE CAST("category" AS TEXT) ILIKE '%${searchCategory}%' AND CAST("location" AS TEXT) ILIKE '%${searchLocation}%' LIMIT 10 OFFSET ${offset}`, { type: sequelize.QueryTypes.SELECT })
    .then((businesses) => {
      if (businesses.length > 0) {
        return res.status(200)
          .json({ message: businessFoundMessage, businesses });
      }
      return res.status(404).json(businessNotFoundMessage);
    })
    .catch(err => res.status(500).json(serverErrorMessage.message));
};

/**
   * Add Business location to the location list in the database
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} res - The response to the client
   * @memberof BusinessHelper
   */
export const addBusinessLocation = (req, res) => {
  const businessLocation = req.body.location.toUpperCase();
  if (req.userData.email !== process.env.ADMIN_CREDENTIAL) {
    return res.status(403).json({ message: 'You are not allowed to perform this operation' });
  }
  return sequelize
    .query(`ALTER TYPE public."enum_Businesses_location" ADD VALUE '${businessLocation}'`, { type: sequelize.QueryTypes.RAW })
    .then(location => res.status(200).json({ message: 'Location added successfully' }))
    .catch(err => res.status(500).json(serverErrorMessage.message));
};

/**
   * Add Business location to the location list in the database
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} res - The response to the client
   * @memberof BusinessHelper
   */
export const removeEmailUnique = (req, res) => {
  const businessLocation = req.body.location.toUpperCase();
  if (req.userData.email !== process.env.ADMIN_CREDENTIAL) {
    return res.status(403).json({ message: 'You are not allowed to perform this operation' });
  }
  return sequelize
    .query('ALTER TABLE ONLY public."ContactUs" DROP CONSTRAINT "ContactUs_email_key"', { type: sequelize.QueryTypes.RAW })
    .then(location => res.status(200).json({ message: 'Email Unique Removed' }))
    .catch(err => res.status(500).json(serverErrorMessage.message));
};

/**
   * Add Business category to the category list in the database
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} res - The response to the client
   * @memberof BusinessHelper
   */
export const addBusinessCategory = (req, res) => {
  const businessCategory = req.body.category.toUpperCase();
  if (req.userData.email !== process.env.ADMIN_CREDENTIAL) {
    return res.status(403).json({ message: 'You are not allowed to perform this operation' });
  }
  return sequelize
    .query(`ALTER TYPE public."enum_Businesses_category" ADD VALUE '${businessCategory}'`, { type: sequelize.QueryTypes.RAW })
    .then(category => res.status(200).json({ message: 'Category added successfully' }))
    .catch(err => res.status(500).json(serverErrorMessage.message));
};

/**
   * Get a list of business categories in the database
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} res - The response to the client
   * @memberof BusinessHelper
   */
export const listBusinessCategories = (req, res) => sequelize
  .query('SELECT enum_range(null::public."enum_Businesses_category")', { type: sequelize.QueryTypes.SELECT })
  .then((result) => {
    let categories = result[0].enum_range;
    if (!Array.isArray(categories)) {
      categories = categories.substring(1, categories.length - 1).split(',');
    }
    res.status(200).json(categories);
  })
  .catch(err => res.status(500).json(serverErrorMessage.message));
