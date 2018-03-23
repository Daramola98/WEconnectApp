import Sequelize from 'sequelize';
import db from '../models/index';
import businessMessages from '../messages/businessEndpoint';

const { Business } = db;
const { Op } = Sequelize;

export default {
  // VALIDATE IF BUSINESS WITH SAME NAME OR EMAIL EXIST IN DATABASE
  businessValidation(req, res, next) {
    let inputEmail, inputName;
    if (req.body.email && req.body.name) {
      inputEmail = req.body.email.replace(/ /g, '');
      inputName = req.body.name.replace(/ +/g, ' ');
    }
    return Business
      .findOne({
        where: {
          [Op.or]: [
            {
              email: {
                ilike: inputEmail
              }
            },
            {
              name: {
                ilike: inputName
              }
            }
          ]
        }
      })
      .then((business) => {
        // console.log(business);
        if (!business) {
          return next();
        }
        if (business.dataValues.email.replace(/ /g, '') === inputEmail && business.dataValues.name.replace(/ /g, '') === inputName.replace(/ /g, '')) {
          return res.status(409).json({ message: 'Business with same name and email address already exists' });
        }
        if (business.dataValues.name.replace(/ /g, '') === inputName.replace(/ /g, '')) {
          return res.status(409).json({ message: 'Business with same name already exists' });
        }
        if (business.dataValues.email.replace(/ /g, '') === inputEmail) {
          return res.status(409).json({ message: 'Business with same email address already exists' });
        }
        next();
      })
      .catch(err => res.status(500).json(err));
  },
  formatBusinessInput(req) {
    req.body.name = req.body.name.replace(/ +/g, ' ');
    req.body.category = req.body.category.replace(/ +/g, ' ');
    req.body.location = req.body.location.replace(/ +/g, ' ');
    req.body.address = req.body.address.replace(/ +/g, ' ');
    req.body.description = req.body.description.replace(/ +/g, ' ');
  },
  formatBusinessUpdateInput(req) {
    const reqBody = Object.keys(req.body);
    for (let i = 0; i < reqBody.length; i += 1) {
      const field = reqBody[i];
      if (field === 'name') {
        req.body.name = req.body.name.replace(/ +/g, ' ');
      } else {
        req.body[reqBody[i]] = req.body[field].replace(/ /g, '');
      }
    }
  },

  checkIfBusinessWithIdExists(req, res, next) {
    Business
      .findOne({
        where: {
          id: req.params.businessId
        }
      })
      .then((business) => {
        if (!business) {
          return res.status(404).json({ message: 'Business with specified id not found' });
        }
        next();
      });
  },

  findBusinessByCategory(req, res) {
    const searchCategory = req.query.category.replace(/ /g, '');
    return Business
      .findAll({
        where: {
          category: {
            ilike: `%${searchCategory}%`
          }
        }
      })
      .then((business) => {
        if (business.length > 0) {
          return res.status(200)
            .json({ message: businessMessages.businessFoundMessage, business });
        }
        if (business.length === 0) {
          return res.status(404).json(businessMessages.businessNotFoundInCategoryMessage);
        }
      })
      .catch(err => res.status(500).json(err));
  },

  findBusinessByLocation(req, res) {
    const searchLocation = req.query.location.replace(/ /g, '');
    return Business
      .findAll({
        where: {
          location: {
            ilike: `%${searchLocation}%`
          }
        }
      })
      .then((business) => {
        if (business.length > 0) {
          return res.status(200)
            .json({ message: businessMessages.businessesFoundMessage, business });
        }
        res.status(404).json(businessMessages.businessNotFoundInLocationMessage);
      })
      .catch(err => res.status(500).json(err));
  },

  findBusinessByLocationAndCategory(req, res) {
    const searchCategory = req.query.category.replace(/ /g, '');
    const searchLocation = req.query.location.replace(/ /g, '');
    return Business
      .findAll({
        where: {
          location: {
            ilike: `%${searchLocation}%`
          },
          category: {
            ilike: `%${searchCategory}%`
          }
        }
      })
      .then((business) => {
        if (business.length > 0) {
          return res.status(200)
            .json({ message: businessMessages.businessFoundMessage, business });
        }
        return res.status(404).json(businessMessages.businessNotFoundMessage);
      })
      .catch(err => res.status(500).json(err));
  }
};

