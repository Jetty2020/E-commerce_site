module.exports = (sequelize, DataTypes) => {

  return sequelize.define('product', {
    productName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    productDes: {
      type: DataTypes.STRING(1024),
    },
    newProduct: {
      type: DataTypes.BOOLEAN,
    },
    saleProduct: {
      type: DataTypes.BOOLEAN,
    },
    recoProduct: {
      type: DataTypes.BOOLEAN,
    },
    fileURL: {
      type: DataTypes.STRING(150),
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