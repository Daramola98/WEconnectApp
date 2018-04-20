import { userNameErrorMessage } from '../messages/userValidation';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Your firstname is required'
        },
        isAlpha: {
          msg: 'Firstname should only contain Alphabets'
        },
        len: {
          args: [3, 50],
          msg: userNameErrorMessage
        },
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Your lastname is required'
        },
        isAlpha: {
          msg: 'Lastname should only contain Alphabets'
        },
        len: {
          args: [3, 50],
          msg: 'lastname should be more than 2 and not greater than 50'
        },
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Username already in use'
      },
      validate: {
        notEmpty: {
          msg: 'Username is required'
        },
        isAlphanumeric: {
          msg: 'Username should only contain alphanumeric characters'
        },
        len: {
          args: [3, 50],
          msg: 'Username should be more than 2 and not greater than 50'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Enter a valid Email Address'
        },
        len: {
          args: [4, 50],
          msg: 'Email should be more than 5 and not greater than 50 characters'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Your password is required'
        },
        len: {
          options: [6, 16],
          msg: 'password should be more than 6 and not greater than 16 characters'
        },
        // matches: {
        //   args: /[^0-9a-bA-B\s]/gi,
        //   msg: 'password should only contain alphabets or alphanumeric characters'
        // }
      }
    },
    telephoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Telephone Number already in use'
      },
      validate: {
        notEmpty: {
          msg: 'Telephone Number is required'
        },
        isInt: {
          msg: 'Enter a valid Telephone Number'
        },
        len: {
          args: [7, 11],
          msg: 'Telephone Number should be within 7 to 11 characters'
        },
      }
    },
    homeNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Home Number is required'
        },
        isInt: {
          msg: 'Enter a valid home Number'
        },
        len: {
          args: [7, 11],
          msg: 'Home number should be within 7 to 11 characters'
        },
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Business, {
      foreignKey: 'userId',
      as: 'businesses'
    });
  };
  return User;
};

export default user;
