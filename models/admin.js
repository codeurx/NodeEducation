module.exports = (sequelize, DataTypes) => {
    var Admin = sequelize.define('admin', {
      username: DataTypes.STRING
    });
    return Admin;
  };