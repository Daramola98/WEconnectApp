import db from '../models/index';

const { Business, BusinessReview } = db;

const businessNotFoundMessage = { message: 'Business not found' };
const businessNotFoundInLocationMessage = { message: 'No Businesses found in the specified location' };
const businessNotFoundInCategoryMessage = { message: 'No Businesses found in the specified category' };
const businessFoundMessage = 'Business found';
const businessesFoundMessage = 'Businesses found';
const businessDeletedMessage = { message: 'Business has been deleted' };
const businessReviewMessage = 'Business Review Added';
const reviewFoundMessage = 'Reviews have been found';

/**
 *
 *@class Business
 *@classdesc creates a Business controller Class
 */
export default class BusinessController {
  // REGISTER A BUSINESS
  /**
   * Adds a new business to the database
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the business created or error message
   * @memberof Business
   */
  static createBusiness(req, res) {
    const businessDetails = {
      name: req.body.name,
      category: req.body.category,
      email: req.body.email,
      telephoneNumber: req.body.telephoneNumber,
      homeNumber: req.body.homeNumber,
      location: req.body.location,
      address: req.body.address,
      UserId: req.userData.userId,
      description: req.body.description
    };
    const businessRegisterMessage = 'Business has been registered successfully';
    return Business
      .create(businessDetails)
      .then(business => res.status(201).json({ message: businessRegisterMessage, business }))
      .catch(err => res.status(400).json(err));
  }

  // LIST ALL BUSINESSES, FILTER BUSINESSES IF LOCATION IS SPECIFIED
  /** Gets all businesses in the database
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} list of businesses in the database
   * @memberof Business Controller
   */
  static listBusinesses(req, res) {
    if (req.query.location) {
      return Business
        .findAll({
          where: {
            location: {
              ilike: req.query.location
            }
          }
        })
        .then((business) => {
          if (business.length > 0) {
            return res.status(200).json({ businessesFoundMessage, business });
          }
          res.status(404).json(businessNotFoundInLocationMessage);
        })
        .catch(err => res.status(500).json(err));
    }
    if (req.query.category) {
      return Business
        .findAll({
          where: {
            category: {
              ilike: req.query.category
            }
          }
        })
        .then(business => res.status(200).json({ businessFoundMessage, business }))
        .catch(err => res.status(404).json(businessNotFoundInCategoryMessage));
    }
    if (req.query.location && req.query.category) {
      return Business
        .findAll({
          where: {
            location: {
              ilike: req.query.location
            },
            category: {
              ilike: req.query.category
            }
          }
        })
        .then(business => res.status(200).json({ businessFoundMessage, business }))
        .catch(err => res.status(404).json(businessNotFoundInCategoryMessage));
    }
    if (!req.query.location && !req.query.category) {
      return Business
        .findAll({
          include: [{
            model: BusinessReview,
            as: 'reviews',
          }],
        })
        .then(businesses => res.status(200).json(businesses))
        .catch(err => res.status(400).json(err));
    }
  }

  // RETRIEVE A BUSINESS
  /**
   * Gets a Business from the database
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the business found or error message
   * @memberof Business
   */
  static retrieveBusiness(req, res) {
    return Business
      .find({
        where: {
          id: req.params.businessId
        }
      })
      .then((business) => {
        if (business) {
          return res.status(200).json({ businessFoundMessage, business });
        }
        res.status(404).json(businessNotFoundMessage);
      })
      .catch(err => res.status(500).json(err));
  }

  // UPDATE A BUSINESS
  /** Update the deatils of  an existing business
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the business updated or error message
   * @memberof Business class
   */
  static updateBusiness(req, res) {
    return Business
      .find({
        where: {
          id: req.params.businessId
        }
      })
      .then((business) => {
        if (!business) {
          return res.status(404).json(businessNotFoundMessage);
        }
        if (req.userData.userId === business.UserId) {
          return business
            .update(req.body, { fields: Object.keys(req.body) })
            .then(updatedBusiness => res.status(200).json({ message: 'Business Updated successfully', updatedBusiness }))
            .catch(err => res.status(500).json(err));
        }
        res.status(401).json({ message: 'You are not authorized to update this business' });
      })
      .catch(err => res.status(500).json(err));
  }

  // DELETE A BUSINESS
  /**
   * Deletes a business from the database
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the business deleted or error message
   * @memberof Business
   */
  static removeBusiness(req, res) {
    return Business
      .find({
        where: {
          id: req.params.businessId
        }
      })
      .then((business) => {
        if (!business) {
          return res.status(404).json(businessNotFoundMessage);
        }
        if (req.userData.userId === business.UserId) {
          return business
            .destroy()
            .then(() => res.status(200).json(businessDeletedMessage))
            .catch(err => res.status(500).json(err));
        }
        res.status(401).json({ message: 'You are not Authorized to delete this business' });
      })
      .catch(err => res.status(500).json(err));
  }

  // ADD A BUSINESS REVIEW
  /**
   * Add a business review to a buiness in the database
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the business review created or error message
   * @memberof Business
   */
  static addReview(req, res) {
    const businessReviewDetails = {
      ReviewerId: req.userData.userId,
      review: req.body.review,
      BusinessId: req.params.businessId
    };
    return Business
      .find({
        where: {
          id: req.params.businessId
        }
      })
      .then((business) => {
        if (!business) {
          return res.status(404).json(businessNotFoundMessage);
        }
        return BusinessReview
          .create(businessReviewDetails)
          .then(review => res.status(201).json({ businessReviewMessage, review }))
          .catch(err => res.status(500).json(err));
      })
      .catch(err => res.status(500).json(err));
  }

  // GET BUSINESS REVIEWS
  /**
   * Retrieves reviews for a business
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the Review found or error message
   * @memberof Business
   */
  static getReview(req, res) {
    return BusinessReview
      .findAll({
        where: {
          BusinessId: req.params.businessId
        }
      })
      .then((reviews) => {
        if (reviews.length > 0) {
          return res.status(200).json({ reviewFoundMessage, reviews });
        }
        res.status(404).json({ message: 'Reviews have not been added for this Business' });
      })
      .catch(err => res.status(500).json(err));
  }
}
