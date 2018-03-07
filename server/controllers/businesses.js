import businesses from '../models/businesses';

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
    res.status(200).json({ message: 'Business has been registered successfully', business });
  },
  // LIST ALL BUSINESSES
  list(req, res) {
    res.status(200).json(businesses);
  }
};
