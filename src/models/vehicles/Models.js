const sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Models",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
      },
      line_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "CardLines",
          key: "id",
        },
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        onUpdate: sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      status: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: "Models",
      timestamps: false,
      indexes: [
        {
          name: "primary_key",
          using: "BTREE",
          unique: true,
          fields: ["id"],
        },
        {
          name: "line_id_index",
          using: "BTREE",
          fields: ["line_id"],
        },
      ],
    }
  );
};
