import Sequelize from 'sequelize';
import businesses from '../dummymodel/businessesDummy';
import db from '../models/index';

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
  formatBusinessInput(req, res) {
    req.body.name = req.body.name.replace(/ +/g, ' ');
    req.body.category = req.body.category.replace(/ +/g, ' ');
    req.body.location = req.body.location.replace(/ +/g, '');
    req.body.address = req.body.address.replace(/ +/g, '');
    req.body.description = req.body.description.replace(/ +/g, '');
  },
  formatBusinessUpdateInput(req, res) {
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
};

