'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Follow = require('./follow')(sequelize, Sequelize);
db.Chatroom = require('./chatroom')(sequelize, Sequelize);
db.ChatRoom_management = require('./chatroom_management')(sequelize, Sequelize);
db.Message = require('./message')(sequelize, Sequelize);

db.User.hashMany(db.Follow, {
  foreignKey : 'follow_from',
  sourceKey : 'userid'
});
db.Follow.belongsTo(db.User, {
  foreignKey : 'follow_from',
  targetKey : 'userid'
});
db.User.hashMany(db.Follow, {
  foreignKey : 'follow_to',
  sourceKey : 'userid'
});
db.Follow.belongsTo(db.User, {
  foreignKey : 'follow_to',
  targetKey : 'userid'
});



module.exports = db;
