const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "TransmissionsTypes",
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
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      status: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      tableName: "TransmissionsTypes",
      timestamps: false,
      indexes: [
        {
          name: "primary_key",
          using: "BTREE",
          unique: true,
          fields: ["id"],
        },
      ],
    }
  );
};
