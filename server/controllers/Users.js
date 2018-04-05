import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { handleInputFormat, handleValidationErrors } from '../helpers/genericHelper';
import modelValidator from '../helpers/modelValidator';
import userValidation from '../validations/userValidation';
import serverErrorMessage from '../messages/serverMessage';

dotenv.config();
const userCreatedMessage = 'User created succesfully';

/**
 *
 *@class User
 *@classdesc creates a Users Class
 */
export default class Users {
  /**
     * Adds a new user to the database
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} Success message with the user created or error message
     * @memberof UserController
     */
  static createUser(req, res) {
    // // let isValidated;
    // modelValidator(userValidation, req, res);
    // // if (!isValidated) {
    // //   return;
    // // }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        handleInputFormat(req);
        const userDetails = {
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
            const createdUser = {
              firstname: user.firstname,
              lastname: user.lastname,
              email: user.email,
              telephoneNumber: user.telephoneNumber,
              homeNumber: user.homeNumber
            };
            res.status(201).json({ message: userCreatedMessage, createdUser });
          })
          .catch((err) => {
            if (err.errors) {
              handleValidationErrors(err.errors, res);
            } else {
              return res.status(500).json(serverErrorMessage.message);
            }
          });
      }
    });
  }

  /**
     * User Details Update
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} Success message with the user updated message in or error message
     * @memberof User
     */
  static updateUserDetails(req, res) {
    handleInputFormat(req);
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
            telephoneNumber: updatedUser.telephoneNumber,
            homeNumber: updatedUser.homeNumber
          };
          res.status(200).json({ message: 'User Updated successfully', updatedUserDetails });
        })
        .catch((err) => {
          if (err.errors) {
            handleValidationErrors(err.errors, res);
          } else {
            return res.status(500).json(serverErrorMessage.message);
          }
        }))
      .catch(err => res.status(500).json(serverErrorMessage.message));
  }

  /**
     * User login
     * @param {object} req - The request object
     * @param {object} res - The response object
     * @return {object} Success message with the user logged in or error message
     * @memberof User
     */
  static loginUser(req, res) {
    handleInputFormat(req);
    if (req.headers.authorization) {
      try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        if (req.userData !== null) {
          return res.status(200).json({ message: 'Logout existing user to login' });
        }
      } catch (error) {
        return res.status(401)
          .json({ message: 'Token is invalid or has expired, update token' });
      }
    }
    return User
      .find({
        where: {
          email: req.body.email
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
                expiresIn: '3hr'
              }
            );
            return res.status(200).json({ message: 'Authentication Successful', token });
          }
          res.status(401).json({ message: 'Authentication failed' });
        });
      })
      .catch(err => res.status(500).json(serverErrorMessage.message));
  }
}
