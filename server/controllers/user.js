import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models/index';
import userHelper from '../helpers/userHelper';
import serverErrorMessage from '../messages/serverMessage';

const { User } = db;
dotenv.config();
const userCreatedMessage = 'User created succesfully';

/**
 *
 *@class User
 *@classdesc creates a User controller Class
 */
export default class UserController {
  // REGISTER A USER
  /**
     * Adds a new user to the database
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} Success message with the user created or error message
     * @memberof UserController
     */
  static createUser(req, res) {
    let userDetails;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        userHelper.formatUserInput(req, res);
        userDetails = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash,
          telephoneNumber: req.body.telephoneNumber,
          homeNumber: req.body.homeNumber
        };
        return User
          .create(userDetails)
          .then((user) => {
            const registeredUserDetails = {
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              telephoneNumber: user.telephoneNumber
            };
            res.status(201).json({ userCreatedMessage, registeredUserDetails });
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
    });
  }

  // UPDATE USER PROFILE DETAILS
  /**
     * User Details Update
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} Success message with the user updated message in or error message
     * @memberof User
     */
  static updateUserDetails(req, res) {
    userHelper.formatUserUpdateInput(req, res);
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    }
    return User
      .findOne({
        where: {
          id: req.userData.userId
        }
      })
      .then(user => user
        .update(req.body, { fields: Object.keys(req.body) })
        .then((updatedUser) => {
          const updatedUserDetails = {
            firstname: updatedUser.firstname,
            lastname: updatedUser.lastname,
            email: updatedUser.email,
            telephoneNumber: updatedUser.telephoneNumber
          };
          res.status(200).json({ message: 'User Updated successfully', updatedUserDetails });
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
        }))
      .catch(err => res.status(500).json(serverErrorMessage.message));
  }

  // LOGIN USER
  /**
     * User login
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} Success message with the user logged in or error message
     * @memberof User
     */
  static loginUser(req, res) {
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        if (req.userData !== null) {
          return res.status(200).json({ message: 'You are already logged in' });
        }
      } catch (errror) {
        return res.status(401).json({ message: 'Token is invalid or has expired, update token' });
      }
    }
    return User
      .find({
        where: {
          email: req.body.email.replace(/ /g, '')
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: 'Authentication failed' });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            return res.status(401).json({ message: 'Authentication failed' });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user.email,
                userId: user.id
              }, process.env.JWT_KEY,
              {
                expiresIn: '1hr'
              }
            );
            req.headers.authorization = `Bearer ${token}`;
            return res.status(200).json({ message: 'Authentication Successful', token });
          }
          res.status(401).json({ message: 'Authentication failed' });
        });
      })
      .catch(err => res.status(400).json(serverErrorMessage.message));
  }
}
