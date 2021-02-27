import Sequelize from "sequelize";

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Product = require('./product')(sequelize, Sequelize);

db.User.hasMany(db.Product, { foreignKey: 'producter', sourceKey: 'id'});
db.Product.belongsTo(db.User, { foreignKey: 'producter', targetKey: 'id'});

module.exports = db;