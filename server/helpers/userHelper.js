import db from '../models/index';
import checkWhiteSpace from '../helpers/genericHelper';

const { User } = db;

export default {
  /**
   * Checks if a user with the same Email already exists
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - callback function to move to next middleware
   * @return {object} res - The response to the client
   * @memberof userHelper
   */
  userEmailValidation(req, res, next) {
    checkWhiteSpace(req);
    return User
      .find({
        where: {
          email: {
            ilike: req.body.email.replace(/ /g, '')
          }
        }
      })
      .then((user) => {
        if (user) {
          return res.status(409).json({ message: 'Email already exists' });
        }
        next();
      });
  },
  /**
   * Checks if a user with the same firstname or lastname already exists
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - callback function to move to next middleware
   * @return {object} res - The response to the client
   * @memberof userHelper
   */
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
          return res.status(409).json({ message: 'User with first name and lastname already exists' });
        }
        next();
      });
  },

  /**
   * Formats user input before sending to the database
   * @param {object} req - The request object
   * @return {null} formats the user input
   * @memberof userHelper
   */
  formatUserInput(req) {
    req.body.firstname = req.body.firstname.replace(/ /g, '');
    req.body.lastname = req.body.lastname.replace(/ /g, '');
    req.body.password = req.body.password.replace(/ /g, '');
    req.body.email = req.body.email.replace(/ /g, '');
  },

  /**
   * Formats user input before sending to the database
   * @param {object} req - The request object
   * @return {object} res - The response to the client
   * @memberof userHelper
   */
  formatUserUpdateInput(req) {
    const reqBody = Object.keys(req.body);
    for (let i = 0; i < reqBody.length; i += 1) {
      const field = reqBody[i];
      req.body[reqBody[i]] = req.body[field].replace(/ /g, '');
    }
  }
};
