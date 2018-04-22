import { Business, BusinessReview, reviewresponse } from '../models';
import { handleInputFormat, handleValidationErrors } from '../helpers/genericHelper';
import { findBusinessByCategory, findBusinessByLocation, findBusinessByLocationAndCategory, findBusinessByName, listBusinessByPages } from '../helpers/businessHelpers';
import {
  businessNotFoundMessage,
  businessNotFoundInCategoryMessage,
  businessNotFoundInLocationMessage,
  businessFoundMessage,
  businessRegisterMessage,
  reviewFoundMessage,
  businessDeletedMessage,
  businessReviewMessage
} from '../messages/businessMessages';
import serverErrorMessage from '../messages/serverMessage';

/**
 *
 *@class Business
 *@classdesc creates a Business Class
 */
export default class Businesses {
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
      userId: req.userData.userId,
      businessOwner: req.userData.username,
      description: req.body.description
    };
    return Business
      .create(businessDetails)
      .then((business) => {
        const createdBusinessDetails = {
          id: business.id,
          name: business.name,
          category: business.category,
          email: business.email,
          telephoneNumber: business.telephoneNumber,
          homeNumber: business.homeNumber,
          location: business.location,
          address: business.address,
          businessAddedBy: business.businessOwner,
          description: business.description
        };
        res.status(201)
          .json({ message: businessRegisterMessage, createdBusinessDetails });
      })
      .catch((err) => {
        if (err.errors) {
          handleValidationErrors(err.errors, res);
        } else {
          return res.status(500).json(serverErrorMessage.message);
        }
      });
  }

  /** Gets all businesses in the database
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} list of businesses in the database
   * @memberof Business Controller
   */
  static listBusinesses(req, res) {
    if (req.query.location && req.query.category) {
      findBusinessByLocationAndCategory(req, res);
    }
    if (req.query.location && !req.query.category) {
      findBusinessByLocation(req, res);
    }
    if (req.query.category && !req.query.location) {
      findBusinessByCategory(req, res);
    }
    if (req.query.name && !req.query.location && !req.query.category) {
      findBusinessByName(req, res);
    }
    if (req.query.pageNumber && !req.query.location && !req.query.category) {
      listBusinessByPages(req, res);
    }
    if (!req.query.location && !req.query.category && !req.query.pageNumber && !req.query.name) {
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
          return res.status(200).json({ message: businessFoundMessage, business });
        }
        res.status(404).json(businessNotFoundMessage);
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
          userId: req.userData.userId
        }
      })
      .then((businesses) => {
        if (businesses.length > 0) {
          return res.status(200).json(businesses);
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
    return Business
      .findOne({
        where: {
          id: req.params.businessId
        }
      })
      .then((business) => {
        if (!business) {
          return res.status(404).json(businessNotFoundMessage);
        }

        if (req.userData.userId !== business.userId) {
          return res.status(403).json({ message: 'You are not allowed to update this business' });
        }

        handleInputFormat(req);

        return business
          .update(req.body, { fields: Object.keys(req.body) })
          .then((updatedBusiness) => {
            const updatedBusinessDetails = {
              name: updatedBusiness.name,
              category: updatedBusiness.category,
              email: updatedBusiness.email,
              telephoneNumber: updatedBusiness.telephoneNumber,
              homeNumber: updatedBusiness.homeNumber,
              location: updatedBusiness.location,
              address: updatedBusiness.address,
              businessAddedBy: updatedBusiness.businessOwner,
              description: updatedBusiness.description
            };
            res.status(200).json({ message: 'Business Updated successfully', updatedBusinessDetails });
          })
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
          return res.status(404).json(businessNotFoundMessage);
        }
        if (req.userData.userId === business.userId) {
          return business
            .destroy()
            .then(() => res.status(200).json(businessDeletedMessage))
            .catch(err => res.status(500).json(serverErrorMessage.message));
        }
        res.status(403).json({ message: 'You are not Allowed to delete this business' });
      })
      .catch(err => res.status(500).json(serverErrorMessage.message));
  }


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
      reviewerId: req.userData.userId,
      review: req.body.review,
      reviewer: req.userData.username,
      businessId: req.params.businessId
    };
    return Business
      .findOne({
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
          .then((review) => {
            const reviewDetails = {
              id: review.id,
              review: review.review,
              reviewerId: review.ReviewerId,
              businessId: review.BusinessId
            };
            res.status(201)
              .json({ message: businessReviewMessage, reviewDetails });
          })
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
      userId: req.userData.userId,
      message: req.body.message,
      reviewer: req.userData.username,
      reviewId: req.params.reviewId
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
                businessId: req.params.businessId
              }
            })
            .then((reviews) => {
              if (reviews.length > 0) {
                return res.status(200)
                  .json({ message: reviewFoundMessage, reviews });
              }
              return res.status(404).json({ message: 'No review added' });
            })
            .catch(err => res.status(500).json(serverErrorMessage.message));
        }
        res.status(404).json({ message: 'Business does not exist, Enter id for existing business' });
      });
  }
}
