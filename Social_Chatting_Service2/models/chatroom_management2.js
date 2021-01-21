module.exports = (sequelize, DataTypes) => {
  // Model definition
  let LogModel = sequelize.define('chatroom_namagement', { 
      chatroom_no: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true},
      join_user: { type: DataTypes.STRING(40), allowNull: false, primaryKey: true}, 
  },
  // Model options 
  {
      timestamps: false,
      freezeTableName: true,
      tableName : "CHATROOM_MANAGEMENT"
  });

  // Remove default primary Keys
  LogModel.removeAttribute('id');

  return LogModel;
};