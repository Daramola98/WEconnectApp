module.exports = (sequelize, DataTypes) => {
  const reviewresponse = sequelize.define('reviewresponse', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'response is required'
        },
        len: {
          args: [2, 500],
          msg: 'Response should be more than 1 and not greater than 500 characters'
        }
      }
    },
  });
  reviewresponse.associate = (models) => {
    reviewresponse.belongsTo(models.BusinessReview, {
      foreignKey: 'ReviewId',
      onDelete: 'CASCADE'
    });
  };
  return reviewresponse;
};
