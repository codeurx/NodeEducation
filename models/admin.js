module.exports = (sequelize, DataTypes) => {
    var Admin = sequelize.define('admin', {
      id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER},
      firstname: { type: DataTypes.STRING,notEmpty: true},
      lastname: { type: DataTypes.STRING,notEmpty: true},
      username: {type:DataTypes.TEXT},
      role : {type:DataTypes.TEXT},
      avatar : {type:DataTypes.STRING,defaultValue:'avatar.png'},
      email: { type:DataTypes.STRING, validate: {isEmail:true} },
      password : {type: DataTypes.STRING,allowNull: false }, 
      last_login: {type: DataTypes.DATE},
      status: {type: DataTypes.ENUM('active','inactive'),defaultValue:'active' }
    });
    return Admin;
  };