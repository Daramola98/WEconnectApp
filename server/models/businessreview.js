const businessReview = (sequelize, DataTypes) => {
  const BusinessReview = sequelize.define('BusinessReview', {
    ReviewerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Business review is required'
        },
        len: {
          args: [3, 500],
          msg: 'Business Review should be more than 2 and not greater than 500 characters'
        }
      }
    },
  });

  BusinessReview.associate = (models) => {
    BusinessReview.hasMany(models.reviewresponse, {
      foreignKey: 'ReviewId',
      as: 'responses',
      onDelete: 'CASCADE'
    });

    BusinessReview.belongsTo(models.Business, {
      foreignKey: 'BusinessId',
      onDelete: 'CASCADE'
    });
  };
  return BusinessReview;
};

export default businessReview;
