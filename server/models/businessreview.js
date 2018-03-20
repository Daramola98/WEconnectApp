const businessReview = (sequelize, DataTypes) => {
  const BusinessReview = sequelize.define('BusinessReview', {
    ReviewerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    }
  });

  BusinessReview.associate = (models) => {
    BusinessReview.belongsTo(models.Business, {
      foreignKey: 'BusinessId',
      onDelete: 'CASCADE'
    });
  };
  return BusinessReview;
};

export default businessReview;
