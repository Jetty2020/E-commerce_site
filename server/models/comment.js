module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "comment",
    {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      // created_at: {
      //   type: DataTypes.DATE,
      //   allowNull: true,
      //   defaultValue: sequelize.literal('now()'),
      // },
    },
    {
      timestamps: false,
      charset: "utf8",
      collate: "utf8_general_ci",
      paranoid: false,
    }
  );
};
