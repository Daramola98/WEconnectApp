import db from '../models/index';
import businessHelper from '../helpers/businessHelpers';
import businessMessages from '../messages/businessEndpoint';
import serverErrorMessage from '../messages/serverMessage';

const { Business, BusinessReview, reviewresponse } = db;

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
    businessHelper.formatBusinessInput(req, res);
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
      .then((business) => {
        const registeredBusiness = {
          name: business.name,
          category: business.category,
          email: business.email,
          telephoneNumber: business.telephoneNumber,
          homeNumber: business.homeNumber,
          location: business.location,
          address: business.address,
          description: business.description
        };
        res.status(201)
          .json({ message: businessMessages.businessRegisterMessage, registeredBusiness });
      })
      .catch((err) => {
        const validationErrors = [];
        if (err.errors.length > 0) {
          for (let i = 0; i < err.errors.length; i += 1) {
            validationErrors.push(err.errors[i].message);
          }
          return res.status(400).json({ message: 'The following validation errors were found', validationErrors });
        }
        return res.status(500).json(serverErrorMessage.message);
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
          const retrievedBusiness = {
            name: business.name,
            category: business.category,
            email: business.email,
            telephoneNumber: business.telephoneNumber,
            homeNumber: business.homeNumber,
            location: business.location,
            address: business.address,
            description: business.description
          };
          return res.status(200)
            .json({ message: businessMessages.businessFoundMessage, retrievedBusiness });
        }
        res.status(404).json(businessMessages.businessNotFoundMessage);
      })
      .catch(err => res.status(500).json(serverErrorMessage.message));
  }

  // RETRIEVE ALL BUSINESSES FOR A PARTICULAR USER
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
          return res.status(200).json({ message: businessMessages.businessFoundMessage, business });
        }
        return res.status(404).json({ message: 'No Businesses' });
      })
      .catch(err => res.status(500).json(serverErrorMessage.message));
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
    businessHelper.formatBusinessUpdateInput(req, res);
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
        const businessName = business.name;
        if (req.userData.userId === business.UserId) {
          return business
            .update(req.body, { fields: Object.keys(req.body) })
            .then(updatedBusiness => res.status(200).json({ message: 'Business Updated successfully', updatedBusiness }))
            .catch((err) => {
              const validationErrors = [];
              for (let i = 0; i < err.errors.length; i += 1) {
                validationErrors.push(err.errors[i].message);
              }
              return res.status(400).json({ message: 'The following validation errors were found', validationErrors });
            });
        }
        res.status(403).json({ message: 'You are not allowed to update this business' });
      })
      .catch((err) => {
        const validationErrors = [];
        if (err.errors.length > 0) {
          for (let i = 0; i < err.errors.length; i += 1) {
            validationErrors.push(err.errors[i].message);
          }
          return res.status(400).json({ message: 'The following validation errors were found', validationErrors });
        }
        return res.status(500).json(serverErrorMessage.message);
      });
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
    const businessReviewDetails = {
      ReviewerId: req.userData.userId,
      review: req.body.review.replace(/ +/g, ' '),
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
            const validationErrors = [];
            if (err.errors.length > 0) {
              for (let i = 0; i < err.errors.length; i += 1) {
                validationErrors.push(err.errors[i].message);
              }
              return res.status(400).json({ message: 'The following validation errors were found', validationErrors });
            }
            return res.status(500).json(serverErrorMessage.message);
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
    const businessReviewResponse = {
      UserId: req.userData.userId,
      message: req.body.message.replace(/ +/g, ' '),
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
            const validationErrors = [];
            if (err.errors.length > 0) {
              for (let i = 0; i < err.errors.length; i += 1) {
                validationErrors.push(err.errors[i].message);
              }
              return res.status(400).json({ message: 'The following validation errors were found', validationErrors });
            }
            return res.status(500).json(serverErrorMessage.message);
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
              return res.status(404).json({ message: 'No review added' });
            })
            .catch(err => res.status(500).json(serverErrorMessage.message));
        }
        res.status(404).json({ message: 'Business does not exist, Enter id for existing business' });
      });
  }
}
