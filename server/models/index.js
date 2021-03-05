import Sequelize from "sequelize";

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Product = require("./product")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);

db.User.belongsToMany(db.Product, {
  as: "Cart",
  through: "cart",
  foreignKey: "userId",
});

db.Product.belongsToMany(db.User, {
  as: "UserCart",
  through: "cart",
  foreignKey: "productId",
});

db.User.belongsToMany(db.Product, {
  as: "WishList",
  through: "wish",
  foreignKey: "userId",
});
db.Product.belongsToMany(db.User, {
  as: "WishList",
  through: "wish",
  foreignKey: "productId",
});

db.Comment.belongsTo(db.User);
db.User.hasMany(db.Comment);
db.Comment.belongsTo(db.Product);
db.Product.hasMany(db.Comment);

module.exports = db;
