module.exports = (sequelize, DataTypes) => {
  // Model definition
  let LogModel = sequelize.define('chatroom', { 
      chatroom_no: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
      chatroom_time: { type: DataTypes.DATE, allowNull: false }, 
  },
  // Model options 
  {
      timestamps: false,
      freezeTableName: true,
      tableName : "CHATROOM"
  });

  // Remove default primary Keys
  LogModel.removeAttribute('id');

  return LogModel;
};