import businesses from '../models/businesses';
import businessHelpers from '../helpers/businessHelpers';

const businessNotFoundMessage = { message: 'Business not found' };
const businessFoundMessage = 'Business found';
const businessDeletedMessage = { message: 'Business has been deleted' };

export default {
  // REGISTER A BUSINESS
  createBusiness(req, res) {
    const business = {
      id: businesses[businesses.length - 1].id + 1,
      name: req.body.name,
      category: req.body.category,
      email: req.body.email,
      number: { home: req.body.telephoneNumber, office: req.body.officeNumber },
      location: req.body.location,
      businessAddress: req.body.businessAddress,
      owner: req.params.username,
      businessDescription: req.body.businessDescription,
      reviews: []
    };
    businesses.push(business);
    const businessRegisterMessage = { message: 'Business has been registered successfully', business };
    res.status(201).json(businessRegisterMessage);
  },
  // LIST ALL BUSINESSES, FILTER BUSINESSES IF LOCATION IS SPECIFIED
  listBusinesses(req, res) {
    if (req.query.location) {
      const location = req.query.location.toLowerCase();
      const filterBusinessesByLocation = businesses
        .filter(business => business.location.toLowerCase() === location);
      if (filterBusinessesByLocation.length > 0) {
        res.status(200).json({ businessFoundMessage, filterBusinessesByLocation });
      } else {
        const businessLocationMessage = { message: 'No businesses in the specified location' };
        res.status(404).json(businessLocationMessage);
      }
    }
    if (req.query.category) {
      const category = req.query.category.toLowerCase();
      const filterBusinessesByCategory = businesses
        .filter(business => business.category.toLowerCase() === category);
      if (filterBusinessesByCategory.length > 0) {
        res.status(200).json({ businessFoundMessage, filterBusinessesByCategory });
      } else {
        const businessCategoryMessage = { message: 'No businesses in the specified category' };
        res.status(404).json(businessCategoryMessage);
      }
    }
    if (!req.query.location && !req.query.category) {
      res.status(200).json(businesses);
    }
  },
  // RETRIEVE A BUSINESS
  retrieveBusiness(req, res) {
    const business = businessHelpers.findBusinessById(req.params.businessId);
    if (business) {
      res.status(200).json({ businessFoundMessage, business });
    } else {
      res.status(404).json(businessNotFoundMessage);
    }
  },
  // UPDATE A BUSINESS
  updateBusiness(req, res) {
    const business = businessHelpers.findBusinessById(req.params.businessId);
    if (business) {
      Object.assign(business, req.body);
      const message = 'Business updated successfully';
      res.status(200).json({ message, business });
    } else {
      res.status(404).json(businessNotFoundMessage);
    }
  },
  // DELETE A BUSINESS
  removeBusiness(req, res) {
    const businessIndex = businessHelpers.findBusinessIndexById(req.params.businessId);
    if (businessIndex === 0) {
      businesses.splice(businessIndex, 1);
      res.status(200).json(businessDeletedMessage);
    }
    if (businessIndex > 0) {
      businesses.splice(businessIndex, 1);
      res.status(200).json(businessDeletedMessage);
    } else {
      res.status(404).json(businessNotFoundMessage);
    }
  },
  // ADD A BUSINESS REVIEW
  addReview(req, res) {
    const business = businessHelpers.findBusinessById(req.params.businessId);
    if (business) {
      business.reviews.push({ userName: req.body.username, review: [req.body.review] });
      const businessReviewMessage = { message: 'Business Review Added' };
      res.status(201).json(businessReviewMessage);
    } else {
      res.status(404).json(businessNotFoundMessage);
    }
  },
  // GET BUSINESS REVIEWS
  getReview(req, res) {
    const business = businessHelpers.findBusinessById(req.params.businessId);
    if (business) {
      const reviewFoundMessage = 'Reviews have been found';
      res.status(200).json({ reviewFoundMessage, reviews: business.reviews });
    } else {
      res.status(404).json(businessNotFoundMessage);
    }
  }
};
