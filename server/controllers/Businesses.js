import { User, Business, BusinessReview, reviewresponse } from '../models';
import { handleInputFormat, handleValidationErrors, listByPages } from '../helpers/genericHelper';
import { findBusinessByCategory, findBusinessByLocation, findBusinessByLocationAndCategory, findBusinessByName } from '../helpers/businessHelpers';
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
import upload from '../middlewares/fileUpload';

/**
 *
 *@class Businesses
 *@classdesc creates a BusinessController Class
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
    const { file, businessImage, userData } = req;
    const {
      name, category,
      email, telephoneNumber, homeNumber, location, address, description
    } = req.body;
    const businessDetails = {
      name,
      category,
      businessImage: file ? businessImage : null,
      email,
      telephoneNumber,
      homeNumber,
      location,
      address,
      userId: userData.userId,
      description
    };
    return Business
      .create(businessDetails)
      .then((business) => {
        const createdBusinessDetails = {
          id: business.id,
          name: business.name,
          businessImage: business.businessImage,
          category: business.category,
          email: business.email,
          telephoneNumber: business.telephoneNumber,
          homeNumber: business.homeNumber,
          location: business.location,
          address: business.address,
          description: business.description
        };
        return res.status(201)
          .json({ message: businessRegisterMessage, createdBusinessDetails });
      })
      .catch((err) => {
        const { errors } = err;
        if (errors) {
          handleValidationErrors(errors, res);
        } else {
          return res.status(500).json(err);
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
    const {
      pageNumber, category, location, name
    } = req.query;
    let offset = 0;
    offset = listByPages(pageNumber, offset);
    if (location && category) {
      return findBusinessByLocationAndCategory(req, res, offset);
    }
    if (location && !category) {
      return findBusinessByLocation(req, res, offset);
    }
    if (category && !location) {
      return findBusinessByCategory(req, res, offset);
    }
    if (name && !location && !category) {
      return findBusinessByName(req, res, offset);
    }
    return Business
      .findAndCountAll({
        offset,
        limit: 9,
        include: [
          {
            model: BusinessReview,
            as: 'reviews',
            attributes: ['rating']
          }
        ]
      })
      .then((result) => {
        const businesses = result.rows;
        const businessesCount = result.count;
        if (businesses.length > 0) {
          return res.status(200).json({ businesses, businessesCount });
        }
        return res.status(404).json({ message: 'No Businesses' });
      })
      .catch(err => res.status(500).json(serverErrorMessage.message));
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
        },
        include: [
          {
            model: User,
            as: 'businessOwner',
            attributes: ['username']
          },
          {
            model: BusinessReview,
            as: 'reviews',
            attributes: ['rating']
          }
        ]
      })
      .then((business) => {
        if (business) {
          return res.status(200).json({ message: businessFoundMessage, business });
        }
        return res.status(404).json(businessNotFoundMessage);
      })
      .catch(() => res.status(500).json(serverErrorMessage.message));
  }

  /**
   * Gets a Business register by the user from the database
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the business found or error message
   * @memberof Business
   */
  static retrieveUserBusinesses(req, res) {
    let offset = 0;
    offset = listByPages(req.query.pageNumber, offset);
    return Business
      .findAndCountAll({
        offset,
        limit: 9,
        where: {
          userId: req.userData.userId
        },
        include: [
          {
            model: BusinessReview,
            as: 'reviews',
            attributes: ['rating']
          }
        ]
      })
      .then((result) => {
        const businesses = result.rows;
        const businessesCount = result.count;
        if (businesses.length > 0) {
          return res.status(200).json({ businesses, businessesCount });
        }
        return res.status(404).json({ message: 'No Businesses' });
      })
      .catch(err => res.status(500).json(serverErrorMessage.message));
  }

  /** Update the details of an existing business
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
        },
        include: [{
          model: User,
          as: 'businessOwner',
          attributes: ['username']
        }]
      })
      .then((business) => {
        if (!business) {
          return res.status(404).json(businessNotFoundMessage);
        }

        if (req.userData.userId !== business.userId) {
          return res.status(403).json({ message: 'You are not allowed to update this business' });
        }

        handleInputFormat(req);
        const businessDetails = req.file ?
          { ...req.body, businessImage: req.businessImage } :
          { ...req.body, businessImage: business.businessImage };
        return business
          .update(
            businessDetails,
            { fields: Object.keys(businessDetails) }
          )
          .then((updatedBusiness) => {
            const {
              name, category, businessImage, businessAddedBy,
              email, telephoneNumber, homeNumber, location, address, description
            } = updatedBusiness;
            const updatedBusinessDetails = {
              name,
              category,
              businessImage,
              email,
              telephoneNumber,
              homeNumber,
              location,
              address,
              businessAddedBy,
              description
            };
            return res.status(200).json({ message: 'Business Updated successfully', updatedBusinessDetails });
          })
          .catch((err) => {
            const { errors } = err;
            if (errors) {
              handleValidationErrors(errors, res);
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
        return res.status(403).json({ message: 'You are not Allowed to delete this business' });
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
    const { review, rating } = req.body;
    const { businessId } = req.params;
    const businessReviewDetails = {
      reviewerId: req.userData.userId,
      review,
      businessId,
      rating
    };
    return Business
      .findOne({
        where: {
          id: businessId
        }
      })
      .then((business) => {
        if (!business) {
          return res.status(404).json(businessNotFoundMessage);
        }
        return BusinessReview
          .create(businessReviewDetails)
          .then((businessReview) => {
            const { id } = businessReview;
            const reviewDetails = {
              id,
              review: businessReview.review,
              reviewerId: businessReview.ReviewerId,
              businessId: businessReview.BusinessId,
              rating: businessReview.rating
            };
            return res.status(201)
              .json({ message: businessReviewMessage, reviewDetails });
          })
          .catch((err) => {
            const { errors } = err;
            if (errors) {
              handleValidationErrors(errors, res);
            } else {
              return res.status(500).json(serverErrorMessage.message);
            }
          });
      })
      .catch(err => res.status(500).json(serverErrorMessage.message));
  }

  /** Update the deatils of an existing business review
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the business review updated or error message
   * @memberof Business class
   */
  static updateReview(req, res) {
    return Business
      .findOne({
        where: {
          id: req.params.businessId
        },
      })
      .then((business) => {
        if (!business) {
          return res.status(404).json(businessNotFoundMessage);
        }
        return BusinessReview
          .findOne({
            where: {
              id: req.params.reviewId
            }
          })
          .then((businessReview) => {
            if (!businessReview) {
              return res.status(404).json({ message: 'Review not found' });
            }
            if (req.userData.userId !== businessReview.reviewerId) {
              return res.status(403).json({ message: 'You are not allowed to update this review' });
            }
            handleInputFormat(req);
            const { review, rating } = req.body;
            const reviewDetails = {
              review,
              rating
            };
            return businessReview
              .update(reviewDetails, { fields: Object.keys(reviewDetails) })
              .then(updatedReview => res.status(200).json({ message: 'Review Updated Successfully', updatedReview }))
              .catch((err) => {
                const { errors } = err;
                if (errors) {
                  handleValidationErrors(errors, res);
                } else {
                  return res.status(500).json(serverErrorMessage.message);
                }
              });
          })
          .catch(err => res.status(500).json(serverErrorMessage.message));
      })
      .catch(err => res.status(500).json(serverErrorMessage.message));
  }

  /** Delete the deatils of an existing business review
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the business review deleted or error message
   * @memberof Business class
   */
  static deleteReview(req, res) {
    const { userData } = req;
    const { businessId, reviewId } = req.params;
    return Business
      .findOne({
        where: {
          id: businessId
        },
      })
      .then((business) => {
        if (!business) {
          return res.status(404).json(businessNotFoundMessage);
        }
        return BusinessReview
          .findOne({
            where: {
              id: reviewId
            }
          })
          .then((review) => {
            if (!review) {
              return res.status(404).json({ message: 'Review not found' });
            }
            if (userData.userId !== review.reviewerId) {
              return res.status(403).json({ message: 'You are not allowed to delete this review' });
            }
            return review
              .destroy()
              .then(() => res.status(200).json({ message: 'Review Deleted Successfully' }))
              .catch(err => res.status(500).json(serverErrorMessage.message));
          })
          .catch(err => res.status(500).json(serverErrorMessage.message));
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
            const { errors } = err;
            if (errors) {
              handleValidationErrors(errors, res);
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
    const { businessId } = req.params;
    let offset = 0;
    offset = listByPages(req.query.pageNumber, offset);
    return Business
      .findOne({
        where: {
          id: businessId
        }
      })
      .then((business) => {
        if (business) {
          return BusinessReview
            .findAndCountAll({
              offset,
              limit: 9,
              include: [{
                model: reviewresponse,
                as: 'responses',
                include: [{
                  model: User,
                  as: 'reviewer',
                  attributes: ['username']
                }]
              },
              {
                model: User,
                as: 'reviewer',
                attributes: ['username']
              }
              ],
              order: [
                ['createdAt', 'DESC'],
              ],
              where: {
                businessId
              }
            })
            .then((result) => {
              const reviews = result.rows;
              const reviewsCount = result.count;
              if (reviews.length > 0) {
                return res.status(200)
                  .json({ message: reviewFoundMessage, reviews, reviewsCount });
              }
              return res.status(404).json({ message: 'No review added' });
            })
            .catch(err => res.status(500).json(err));
        }
        return res.status(404).json({ message: 'Business does not exist, Enter id for existing business' });
      });
  }
}
