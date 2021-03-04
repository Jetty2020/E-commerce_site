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

db.User.belongsToMany(db.Product, { as: "cartProduct", through: "cart" });
db.Product.belongsToMany(db.User, { as: "userCart", through: "cart" });

db.User.belongsToMany(db.Product, { as: "wishList", through: "wish" });
db.Product.belongsToMany(db.User, { as: "userWish", through: "wish" });

db.User.belongsToMany(db.Product, { as: "commentProduct", through: "comment" });
db.Product.belongsToMany(db.User, { as: "userComment", through: "comment" });

module.exports = db;
