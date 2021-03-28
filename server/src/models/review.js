module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "review",
    {
      text: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      rate: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      timestamps: false,
      charset: "utf8",
      collate: "utf8_general_ci",
      paranoid: false,
    }
  );
};
