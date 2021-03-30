import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const db = {};

let sequelize;
if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize(
    process.env.MYSQL_DATABASE_DEV,
    process.env.MYSQL_USER_DEV,
    process.env.MYSQL_PASSWORD_DEV,
    {
      username: process.env.MYSQL_USER_DEV,
      password: process.env.MYSQL_PASSWORD_DEV,
      database: process.env.MYSQL_DATABASE_DEV,
      host: process.env.MYSQL_HOST_DEV,
      dialect: process.env.MYSQL_DIALECT,
    }
  );
} else {
  sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      host: process.env.MYSQL_HOST,
      dialect: process.env.MYSQL_DIALECT,
    }
  );
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Product = require('./product')(sequelize, Sequelize);
db.Review = require('./review')(sequelize, Sequelize);
db.QnA = require('./QnA')(sequelize, Sequelize);

db.User.belongsToMany(db.Product, {
  as: 'Cart',
  through: 'cart',
  foreignKey: 'userId',
});

db.Product.belongsToMany(db.User, {
  as: 'UserCart',
  through: 'cart',
  foreignKey: 'productId',
});

db.User.belongsToMany(db.Product, {
  as: 'WishList',
  through: 'wish',
  foreignKey: 'userId',
});
db.Product.belongsToMany(db.User, {
  as: 'WishList',
  through: 'wish',
  foreignKey: 'productId',
});

db.Review.belongsTo(db.User);
db.User.hasMany(db.Review);
db.Review.belongsTo(db.Product);
db.Product.hasMany(db.Review);

db.QnA.belongsTo(db.User);
db.User.hasMany(db.QnA);
db.QnA.belongsTo(db.Product);
db.Product.hasMany(db.QnA);

module.exports = db;
