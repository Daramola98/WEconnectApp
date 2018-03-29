import messages from '../messages/userValidation';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Your firstname is required'
        },
        len: {
          args: [3, 50],
          msg: messages.userNameErrorMessage
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
        len: {
          args: [3, 50],
          msg: 'lastname should be more than 2 and not greater than 50'
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
          msg: 'password should be more than 5 and not greater than 16 characters'
        },
      }
    },
    telephoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Telephone Number is required'
        },
        isInt: {
          msg: 'Enter a valid Telephone Number'
        },
        isLength: {
          options: [{ min: 7, max: 11 }],
          msg: 'Telephone Number should be 11 characters'
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
          msg: 'Home number should be more 11 characters'
        },
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Business, {
      foreignKey: 'UserId',
      as: 'businesses'
    });
  };
  return User;
};

export default user;
