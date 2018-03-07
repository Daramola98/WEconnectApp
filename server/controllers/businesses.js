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
    };
    businesses.push(business);
    res.status(201).json({ message: 'Business has been registered successfully', business });
  },
  // LIST ALL BUSINESSES
  list(req, res) {
    res.status(200).json(businesses);
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
      res.status(404)
    } 
  }
};
