const businessReview = (sequelize, DataTypes) => {
  const BusinessReview = sequelize.define('BusinessReview', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    ReviewerId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  BusinessReview.associate = (models) => {
    BusinessReview.belongs(models.Business, {
      foreignKey: 'BusinessId',
      onDelete: 'CASCADE'
    });
  };
  return BusinessReview;
};

export default businessReview;
