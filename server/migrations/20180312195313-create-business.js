module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Businesses', {
    id: {
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      type: Sequelize.UUID,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    location: {
      type: Sequelize.ENUM,
      values: ['ABIA',
        'ADAMAWA',
        'AKWA IBOM',
        'ANAMBRA',
        'BAUCHI',
        'BAYELSA',
        'BENUE',
        'BORNO',
        'CROSS RIVER',
        'DELTA',
        'EBONYI',
        'ENUGU',
        'EDO',
        'EKITI',
        'GOMBE',
        'IMO',
        'JIGAWA',
        'KADUNA',
        'KANO',
        'KATSINA',
        'KEBBI',
        'KOGI',
        'KWARA',
        'LAGOS',
        'NASARAWA',
        'NIGER',
        'OGUN',
        'ONDO',
        'OSUN',
        'OYO',
        'PLATEAU',
        'RIVERS',
        'SOKOTO',
        'TARABA',
        'YOBE',
        'ZAMFARA'],
      allowNull: false
    },
    category: {
      type: Sequelize.ENUM,
      values: ['GAMING', 'TECHNOLOGY', 'HOUSING', 'TRANSPORTATION', 'SOLAR', 'CONSTRUCTION', 'COOKING'],
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    telephoneNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    homeNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
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
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Businesses')
};
