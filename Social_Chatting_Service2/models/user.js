'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    
  class user extends Model {
    static associate(models) {
      // define association here
    }
  };
  user.init({
    userid: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};

module.exports = (sequelize, DataTypes) => {
    // Model definition
    let LogModel = sequelize.define('user', { 
        userid: { type: DataTypes.STRING(40), primaryKey: true},
        password: { type: DataTypes.STRING(255), allowNull: false }, 
        create_time: { type: DataTypes.DATE, allowNull: false }
    },
    // Model options 
    {
        timestamps: false,
        freezeTableName: true,
        tableName : "USER"
    });
  
    // Remove default primary Keys
    LogModel.removeAttribute('id');
  
    return LogModel;
  };