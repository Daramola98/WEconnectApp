const businessReview = (sequelize, DataTypes) => {
  const BusinessReview = sequelize.define('BusinessReview', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    reviewerId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Business review is required'
        },
        len: {
          args: [2, 500],
          msg: 'Business Review should be more than 1 and not greater than 500 characters'
        }
      }
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Rating is required'
        },
        min: 0,
        max: 5
      }
    }
  });

  BusinessReview.associate = (models) => {
    BusinessReview.hasMany(models.reviewresponse, {
      foreignKey: 'reviewId',
      as: 'responses',
      onDelete: 'CASCADE'
    });

    BusinessReview.belongsTo(models.Business, {
      foreignKey: 'businessId',
      onDelete: 'CASCADE'
    });

    BusinessReview.belongsTo(models.User, {
      foreignKey: 'reviewerId',
      as: 'reviewer',
      onDelete: 'CASCADE'
    });
  };
  return BusinessReview;
};

export default businessReview;
