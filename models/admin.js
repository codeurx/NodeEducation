module.exports = (sequelize, DataTypes) => {
    var Admin = sequelize.define('Admin', {
      username: DataTypes.STRING
    });
    return Admin;
  };