module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "QnA",
    {
      text: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },
      secret: {
        type: DataTypes.BOOLEAN,
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
