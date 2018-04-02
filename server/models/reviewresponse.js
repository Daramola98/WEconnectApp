module.exports = (sequelize, DataTypes) => {
  const reviewresponse = sequelize.define('reviewresponse', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
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
      foreignKey: 'reviewId',
      onDelete: 'CASCADE'
    });
  };
  return reviewresponse;
};
