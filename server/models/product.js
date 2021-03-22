module.exports = (sequelize, DataTypes) => {

  return sequelize.define('product', {
    productName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    mainImg: {
      type: DataTypes.STRING(150),
    },
    descImg: {
      type: DataTypes.STRING(150),
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    rate: {
      type: DataTypes.INTEGER.UNSIGNED,
			defaultValue: 0,
    },
    stock: {
      type: DataTypes.INTEGER.UNSIGNED,
    },
    newProduct: {
      type: DataTypes.BOOLEAN,
    },
    bestProduct: {
      type: DataTypes.BOOLEAN,
    },
    recoProduct: {
      type: DataTypes.BOOLEAN,
    },
    // created_at: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    //   defaultValue: sequelize.literal('now()'),
    // },
  }, {
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    paranoid: false,
  });
};