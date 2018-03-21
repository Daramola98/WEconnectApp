import db from '../models/index';
import checkWhiteSpace from '../helpers/genericHelper';

const { User } = db;

export default {
  userEmailValidation(req, res, next) {
    checkWhiteSpace(req);
    return User
      .find({
        where: {
          email: req.body.email.replace(/ /g, '')
        }
      })
      .then((user) => {
        if (user) {
          res.status(409).json({ message: 'Email already exists' });
        } else {
          next();
        }
      });
  },

  userNameValidation(req, res, next) {
    checkWhiteSpace(req);
    return User
      .find({
        where: {
          firstname: {
            ilike: req.body.firstname.replace(/ /g, '')
          },
          lastname: {
            ilike: req.body.lastname.replace(/ /g, '')
          },
        }
      })
      .then((user) => {
        if (user) {
          res.status(409).json({ message: 'User with first name and lastname already exists' });
        } else {
          next();
        }
      });
  },

  formatUserInput(req) {
    req.body.firstname = req.body.firstname.replace(/ /g, '');
    req.body.lastname = req.body.lastname.replace(/ /g, '');
    req.body.password = req.body.password.replace(/ /g, '');
    req.body.email = req.body.email.replace(/ /g, '');
  },

  formatUserUpdateInput(req) {
    const reqBody = Object.keys(req.body);
    for (let i = 0; i < reqBody.length; i += 1) {
      const field = reqBody[i];
      req.body[reqBody[i]] = req.body[field].replace(/ /g, '');
    }
  }
};
