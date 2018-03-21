module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('reviewresponses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    message: {
      type: Sequelize.STRING
    },
    ReviewId: {
      type: Sequelize.INTEGER,
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
