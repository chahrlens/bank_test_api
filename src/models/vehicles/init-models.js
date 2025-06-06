var DataTypes = require("sequelize").DataTypes;
const _Users = require("./Users");
const _Brands = require("./Brands");
const _CarLines = require("./CarLines");
const _Models = require("./Models");
const _TransmissionsTypes = require("./TransmissionsTypes");
const _FuelTypes = require("./FuelTypes");
const _Vehicles = require("./Vehicles");

function initModels(sequelize) {
  const Users = _Users(sequelize, DataTypes);
  const Brands = _Brands(sequelize, DataTypes);
  const CarLines = _CarLines(sequelize, DataTypes);
  const Models = _Models(sequelize, DataTypes);
  const TransmissionsTypes = _TransmissionsTypes(sequelize, DataTypes);
  const FuelTypes = _FuelTypes(sequelize, DataTypes);
  const Vehicles = _Vehicles(sequelize, DataTypes);

  Vehicles.belongsTo(Models, { as: "model", foreignKey: "model_id" });
  Models.hasMany(Vehicles, { as: "vehicles", foreignKey: "model_id" });
  Vehicles.belongsTo(Users, { as: "user", foreignKey: "user_id" });
  Users.hasMany(Vehicles, { as: "vehicles", foreignKey: "user_id" });
  CarLines.belongsTo(Brands, { as: "brand", foreignKey: "brand_id" });
  Brands.hasMany(CarLines, { as: "car_lines", foreignKey: "brand_id" });
  Models.belongsTo(CarLines, { as: "line", foreignKey: "line_id" });
  CarLines.hasMany(Models, { as: "models", foreignKey: "line_id" });
  Vehicles.belongsTo(FuelTypes, { as: "fuel_type_fuel_type", foreignKey: "fuel_type" });
  FuelTypes.hasMany(Vehicles, { as: "vehicles", foreignKey: "fuel_type" });
  Vehicles.belongsTo(TransmissionsTypes, { as: "transmission_type_transmissions_type", foreignKey: "transmission_type" });
  TransmissionsTypes.hasMany(Vehicles, { as: "vehicles", foreignKey: "transmission_type" });

  return {
    Users,
    Brands,
    CarLines, // Cambiado de Lines a CarLines
    Models,
    TransmissionsTypes,
    FuelTypes,
    Vehicles,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
