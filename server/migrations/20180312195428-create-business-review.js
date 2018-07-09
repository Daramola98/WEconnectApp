module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('BusinessReviews', {
    id: {
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      type: Sequelize.UUID,
    },
    reviewerId: {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    review: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    rating: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    businessId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'Businesses',
        key: 'id'
      }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('BusinessReviews')
};
