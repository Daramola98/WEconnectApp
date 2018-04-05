import messages from '../messages/businessValidation';

const business = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Business name exists'
      },
      validate: {
        len: {
          args: [5, 50],
          msg: messages.businessNameErrorMessage
        },
        notEmpty: {
          msg: 'Your Business name is required'
        },
        // matches: {
        //   args: /[^0-9a-bA-B\s]/gi,
        //   msg: 'Business name should only contain alphabets or alphanumeric characters'
        // }
      }
    },
    location: {
      type: DataTypes.ENUM,
      values: ['ABIA',
        'ADAMAWA',
        'AKWA IBOM',
        'ANAMBRA',
        'BAUCHI',
        'BAYELSA',
        'BENUE',
        'BORNO',
        'CROSS RIVER',
        'DELTA',
        'EBONYI',
        'ENUGU',
        'EDO',
        'EKITI',
        'GOMBE',
        'IMO',
        'JIGAWA',
        'KADUNA',
        'KANO',
        'KATSINA',
        'KEBBI',
        'KOGI',
        'KWARA',
        'LAGOS',
        'NASARAWA',
        'NIGER',
        'OGUN',
        'ONDO',
        'OSUN',
        'OYO',
        'PLATEAU',
        'RIVERS',
        'SOKOTO',
        'TARABA',
        'YOBE',
        'ZAMFARA'],
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Business Location is required',
        },
        len: {
          args: [3, 100],
          msg: 'Business location should be more than 3 and not greater than 100 characters'
        }
      }
    },
    category: {
      type: DataTypes.ENUM,
      values: ['GAMING', 'TECHNOLOGY', 'HOUSING', 'TRANSPORTATION', 'SOLAR', 'CONSTRUCTION', 'COOKING'],
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Business Category is required'
        },
        len: {
          args: [5, 50],
          msg: 'Business Category should be more than 5 and not greater than 100 characters'
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
          args: [5, 50],
          msg: 'Email should be more than 5 and not greater than 100 characters'
        },
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Business Address is required'
        },
        len: {
          args: [4, 50],
          msg: 'Business Address should be more than 3 and not greater than 50 characters'
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
        len: {
          args: [7, 11],
          msg: 'Telephone Number should be 7 to 11 characters'
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
          msg: 'Enter a valid Home Number'
        },
        len: {
          args: [7, 11],
          msg: 'Home Number should be 7 to 11 characters'
        },
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Provide a description of your business not more than 500 characters'
        },
        len: {
          args: [20, 500],
          msg: 'Business description should be more than 20 and not greater than 500'
        },
      }
    }
  });

  Business.associate = (models) => {
    Business.hasMany(models.BusinessReview, {
      foreignKey: 'businessId',
      as: 'reviews',
      onDelete: 'CASCADE'
    });
    Business.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Business;
};

export default business;
