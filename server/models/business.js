const business = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telephoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homeNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  });

  Business.associate = (models) => {
    Business.hasMany(models.BusinessReview, {
      foreignKey: 'BusinessId',
      as: 'reviews',
      onDelete: 'CASCADE'
    });
    Business.belongsTo(models.User, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
  };
  return Business;
};

export default business;
