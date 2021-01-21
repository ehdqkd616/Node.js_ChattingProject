module.exports = (sequelize, DataTypes) => {
  // Model definition
  let LogModel = sequelize.define('follow', {
    status: { type: DataTypes.STRING(2), allowNull: false }
  },
  // Model options 
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "FOLLOW"
  });

  // Remove default primary Keys
  LogModel.removeAttribute('id');

  return LogModel;
};