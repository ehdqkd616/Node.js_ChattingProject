module.exports = (sequelize, DataTypes) => {
  // Model definition
  let LogModel = sequelize.define('message', {
      message_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      message_content: { type: DataTypes.STRING(1000), allowNull: false },
      message_sendtime: { type: DataTypes.DATE, allowNull: false },
      message_sender: { type: DataTypes.STRING(40), allowNull: false },
      chatroom_no: { type: DataTypes.INTEGER, allowNull: false } 
  },
  // Model options 
  {
      timestamps: false,
      freezeTableName: true,
      tableName: "MESSAGE"
  });

  // Remove default primary Keys
  LogModel.removeAttribute('id');

  return LogModel;
};