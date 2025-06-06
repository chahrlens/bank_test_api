const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Vehicles",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      model_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Models",
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      vim: {
        type: DataTypes.STRING(17),
        allowNull: false,
        unique: true,
      },
      color: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      engine_number: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      mileage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      plate_number: {
        type: DataTypes.STRING(15),
        allowNull: true,
        unique: true,
      },
      fuel_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "FuelTypes",
          key: "id",
        },
      },
      transmission_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "TransmissionsTypes",
          key: "id",
        },
      },
      registration_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      tableName: "Vehicles",
      timestamps: false,
      indexes: [
        {
          name: "primary_key",
          using: "BTREE",
          unique: true,
          fields: ["id"],
        },
        {
          name: "unique_vim",
          using: "BTREE",
          unique: true,
          fields: ["vim"],
        },
        {
          name: "unique_plate_number",
          using: "BTREE",
          unique: true,
          fields: ["plate_number"],
        },
        {
          name: "unique_engine_number",
          using: "BTREE",
          unique: true,
          fields: ["engine_number"],
        },
      ],
    },
    {}
  );
};
