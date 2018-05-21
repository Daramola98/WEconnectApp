module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('reviewresponses', {
    id: {
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      type: Sequelize.UUID,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    message: {
      type: Sequelize.STRING
    },
    reviewId: {
      type: Sequelize.UUID,
      onDelete: 'CASCADE',
      references: {
        model: 'BusinessReviews',
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('reviewresponses')
};
