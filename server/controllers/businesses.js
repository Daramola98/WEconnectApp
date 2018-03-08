import businesses from '../models/businesses';
import businessHelpers from '../helpers/businessHelpers';

export default {
  // REGISTER A BUSINESS
  create(req, res) {
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
    res.status(201).json({ message: 'Business has been registered successfully', business });
  },
  // LIST ALL BUSINESSES, FILTER BUSINESSES IF LOCATION IS SPECIFIED
  list(req, res) {
    if (req.query.location) {
      const location = req.query.location.toLowerCase();
      const filterBusinesses = businesses
        .filter(business => business.location.toLowerCase() === location);
      if (filterBusinesses.length > 0) {
        res.status(200).json(filterBusinesses);
      } else {
        res.status(404).json({ message: 'No businesses in the specified location' });
      }
    }
    if (!req.query.location) {
      res.status(200).json(businesses);
    }
  },
  // RETRIEVE A BUSINESS
  retrieve(req, res) {
    const business = businessHelpers.findBusinessById(req.params.businessId);
    if (business) {
      res.status(200).json(business);
    } else {
      res.status(404).json({ message: 'Business not found' });
    }
  },
  // UPDATE A BUSINESS
  update(req, res) {
    const business = businessHelpers.findBusinessById(req.params.businessId);
    if (business) {
      Object.assign(business, req.body);
      res.status(200).json(business);
    } else {
      res.status(404).json({ message: 'Business not found' });
    }
  },
  // DELETE A BUSINESS
  remove(req, res) {
    const businessIndex = businessHelpers.findBusinessIndexById(req.params.businessId);
    if (businessIndex === 0) {
      businesses.splice(businessIndex, 1);
      res.status(200).json({ message: 'Business has been deleted' });
    }
    if (businessIndex > 0) {
      businesses.splice(businessIndex, 1);
      res.status(200).json({ message: 'Business has been deleted' });
    } else {
      res.status(404).json({ message: 'Business not found' });
    }
  },
  // ADD A BUSINESS REVIEW
  addReview(req, res) {
    const business = businessHelpers.findBusinessById(req.params.businessId);
    if (business) {
      business.reviews.push({ userName: req.body.username, review: [req.body.review] });
      res.status(201).json({ message: 'Business Review Added' });
    } else {
      res.status(404).json({ message: 'Business not found' });
    }
  },
  // GET BUSINESS REVIEWS
  getReview(req, res) {
    const business = businessHelpers.findBusinessById(req.params.businessId);
    if (business) {
      res.status(200).json(business.reviews);
    } else {
      res.status(404).json({ message: 'Business not found' });
    }
  },
  // GET BUSINESSES IN A SPECIFIED LOCATION
  getBusinessByLocation(req, res) {
    const { location } = req.query.location;
    const filterBusinesses = businesses.filter(business => business.location !== location);
    if (filterBusinesses) {
      res.status(200).json(filterBusinesses);
    } else {
      res.status(404).json({ message: 'No businesses in the specified location' });
    }
  }
};
