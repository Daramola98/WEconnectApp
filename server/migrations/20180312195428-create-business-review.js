module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('BusinessReviews', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    ReviewerId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    review: {
      allowNull: false,
      type: Sequelize.TEXT,
      unique: true
    },
    BusinessId: {
      type: Sequelize.INTEGER,
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('BusinessReviews')
};
