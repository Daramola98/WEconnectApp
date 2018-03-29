import { Business, BusinessReview, reviewresponse } from '../models';
import handleInputFormat from '../helpers/handleInputFormat';
import businessHelper from '../helpers/businessHelpers';
import businessMessages from '../messages/businessMessages';
import serverErrorMessage from '../messages/serverMessage';
import validationHelper from '../helpers/validationHelper';

const { handleValidationErrors } = validationHelper;

/**
 *
 *@class Business
 *@classdesc creates a Business Class
 */
export default class Businesses {
  // REGISTER A BUSINESS
  /**
   * Adds a new business to the database
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the business created or error message
   * @memberof Business
   */
  static createBusiness(req, res) {
    handleInputFormat(req);
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
    return Business
      .create(businessDetails)
      .then(business => res.status(201)
        .json({ message: business.businessRegisterMessage, business }))
      .catch((err) => {
        if (err.errors) {
          handleValidationErrors(err.errors, res);
        } else {
          return res.status(500).json(serverErrorMessage.message);
        }
      });
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
    if (req.query.location && req.query.category) {
      businessHelper.findBusinessByLocationAndCategory(req, res);
    }
    if (req.query.location && !req.query.category) {
      businessHelper.findBusinessByLocation(req, res);
    }
    if (req.query.category && !req.query.location) {
      businessHelper.findBusinessByCategory(req, res);
    }
    if (!req.query.location && !req.query.category) {
      return Business
        .findAll()
        .then((businesses) => {
          if (businesses.length > 0) {
            return res.status(200).json(businesses);
          }
          return res.status(404).json({ message: 'No Businesses' });
        })
        .catch(err => res.status(500).json(serverErrorMessage.message));
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
      .findOne({
        where: {
          id: req.params.businessId
        }
      })
      .then((business) => {
        if (business) {
          return res.status(200).json({ message: businessMessages.businessFoundMessage, business });
        }
        res.status(404).json(businessMessages.businessNotFoundMessage);
      })
      .catch(err => res.status(500).json(serverErrorMessage.message));
  }

  /**
   * Gets a Business register by the user from the database
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the business found or error message
   * @memberof Business
   */
  static retrieveUserBusinesses(req, res) {
    return Business
      .findAll({
        where: {
          UserId: req.userData.userId
        }
      })
      .then((business) => {
        if (business.length > 0) {
          return res.status(200).json(business);
        }
        return res.status(404).json({ message: 'No Businesses' });
      })
      .catch(err => res.status(500).json(serverErrorMessage.message));
  }

  /** Update the deatils of  an existing business
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the business updated or error message
   * @memberof Business class
   */
  static updateBusiness(req, res) {
    handleInputFormat(req);
    return Business
      .findOne({
        where: {
          id: req.params.businessId
        }
      })
      .then((business) => {
        if (!business) {
          return res.status(404).json(businessMessages.businessNotFoundMessage);
        }
        if (req.userData.userId === business.UserId) {
          return business
            .update(req.body, { fields: Object.keys(req.body) })
            .then(updatedBusiness => res.status(200).json({ message: 'Business Updated successfully', updatedBusiness }))
            .catch((err) => {
              if (err.errors) {
                handleValidationErrors(err.errors, res);
              } else {
                return res.status(500).json(serverErrorMessage.message);
              }
            });
        }
        res.status(403).json({ message: 'You are not allowed to update this business' });
      })
      .catch(err => res.status(500).json(serverErrorMessage.message));
  }

  /**
   * Deletes a business from the database
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the business deleted or error message
   * @memberof Business
   */
  static removeBusiness(req, res) {
    return Business
      .findOne({
        where: {
          id: req.params.businessId
        }
      })
      .then((business) => {
        if (!business) {
          return res.status(404).json(businessMessages.businessNotFoundMessage);
        }
        if (req.userData.userId === business.UserId) {
          return business
            .destroy()
            .then(() => res.status(200).json(businessMessages.businessDeletedMessage))
            .catch(err => res.status(500).json(serverErrorMessage.message));
        }
        res.status(403).json({ message: 'You are not Allowed to delete this business' });
      })
      .catch(err => res.status(500).json(serverErrorMessage.message));
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
    handleInputFormat(req);
    const businessReviewDetails = {
      ReviewerId: req.userData.userId,
      review: req.body.review,
      BusinessId: req.params.businessId
    };
    return Business
      .findOne({
        where: {
          id: req.params.businessId
        }
      })
      .then((business) => {
        if (!business) {
          return res.status(404).json(businessMessages.businessNotFoundMessage);
        }
        return BusinessReview
          .create(businessReviewDetails)
          .then(review => res.status(201)
            .json({ message: businessMessages.businessReviewMessage, review }))
          .catch((err) => {
            if (err.errors) {
              handleValidationErrors(err.errors, res);
            } else {
              return res.status(500).json(serverErrorMessage.message);
            }
          });
      })
      .catch(err => res.status(500).json(serverErrorMessage.message));
  }


  // ADD A BUSINESS REVIEW RESPONSE
  /**
   * Add a business review response to a buinessreview in the database
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the review response created or error message
   * @memberof Business
   */
  static addReviewResponse(req, res) {
    handleInputFormat(req);
    const businessReviewResponse = {
      UserId: req.userData.userId,
      message: req.body.message,
      ReviewId: req.params.reviewId
    };
    return BusinessReview
      .findOne({
        where: {
          id: req.params.reviewId
        }
      })
      .then((review) => {
        if (!review) {
          return res.status(404).json({ message: 'Review not found' });
        }
        return reviewresponse
          .create(businessReviewResponse)
          .then(response => res.status(201)
            .json({ message: 'Response submitted', response }))
          .catch((err) => {
            if (err.errors) {
              handleValidationErrors(err.errors, res);
            } else {
              return res.status(500).json(serverErrorMessage.message);
            }
          });
      })
      .catch(err => res.status(500).json(serverErrorMessage.message));
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
    return Business
      .findOne({
        where: {
          id: req.params.businessId
        }
      })
      .then((business) => {
        if (business) {
          return BusinessReview
            .findAll({
              include: [{
                model: reviewresponse,
                as: 'responses',
              }],
              where: {
                BusinessId: req.params.businessId
              }
            })
            .then((reviews) => {
              if (reviews.length > 0) {
                return res.status(200)
                  .json({ message: businessMessages.reviewFoundMessage, reviews });
              }
              return res.status(404).json({ message: 'Reviews have not been added for this Business' });
            })
            .catch(err => res.status(500).json(serverErrorMessage.message));
        }
        res.status(404).json({ message: 'Business does not exist, Enter id for existing business' });
      });
  }
}
