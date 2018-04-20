module.exports = (sequelize, DataTypes) => {
  const ContactUs = sequelize.define('ContactUs', {
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
          msg: 'First name should be between 3 to 50 characters'
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
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: false,
      validate: {
        notEmpty: {
          msg: 'Message is required'
        },
        len: {
          args: [2, 500],
          msg: 'Message should be more than 1 and not greater than 500 characters'
        }
      }
    }
  });
  return ContactUs;
};
