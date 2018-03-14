const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telephoneNumber: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    homeNumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Business, {
      foreignKey: 'UserId',
      as: 'businesses'
    });
  };
  return User;
};

export default user;
