const db = require("../models/vehicles");
const { Op } = require("sequelize");

exports.getUsers = async ({ status = 1, id, fullName }) => {
  return await db.models.Users.findAll({
    where: {
      status,
      ...(id ? { id } : {}),
      ...(fullName ? { fullName: { [Op.like]: `%${fullName}%` } } : {}),
    },
  });
};

exports.addUser = async (fullName) => {
  return await db.models.Users.create({ fullName });
};

exports.updateUser = async ({ id, fullName }) => {
  return await db.models.Users.update(
    { fullName },
    { where: { status: 1, id } }
  );
};

exports.disableUser = async (id) => {
  return await db.models.Users.update(
    { status: 0 },
    { where: { status: 1, id } }
  );
};

exports.getBrands = async ({ status = 1, id, name }) => {
  return await db.models.Brands.findAll({
    where: {
      status,
      ...(id ? { id } : {}),
      ...(name ? { name: { [Op.like]: `%${name}%` } } : {}),
    },
  });
};

exports.addBrand = async (name) => {
  return await db.models.Brands.create({ name });
};

exports.updateBrand = async ({ id, name }) => {
  return await db.models.Brands.update({ name }, { where: { status: 1, id } });
};

exports.disableBrand = async (id) => {
  return await db.models.Brands.update(
    { status: 0 },
    { where: { status: 1, id } }
  );
};

exports.getLines = async ({ status = 1, id, name, brandId }) => {
  return await db.models.CarLines.findAll({
    where: {
      status,
      ...(id ? { id } : {}),
      ...(name ? { name: { [Op.like]: `%${name}%` } } : {}),
    },
    include: [
      {
        model: db.models.Brands,
        as: "brand",
        where: { status: 1, ...(brandId ? { id: brandId } : {}) },
      },
    ],
  });
};

exports.addLine = async ({ name, brandId }) => {
  return await db.models.CarLines.create({ name, brand_id: brandId });
};

exports.updateCarLine = async ({ id, name }) => {
  return await db.models.CarLines.update({ name }, { where: { status: 1, id } });
};

exports.disableLine = async (id) => {
  return await db.models.CarLines.update(
    { status: 0 },
    { where: { status: 1, id } }
  );
};

exports.getModels = async ({ status = 1, id, name, lineId, year }) => {
  return await db.models.Models.findAll({
    where: {
      status,
      ...(id ? { id } : {}),
      ...(name ? { name: { [Op.like]: `%${name}%` } } : {}),
      ...(lineId ? { line_id: lineId } : {}),
      ...(year ? { year } : {}),
    },
  });
};

exports.addModel = async ({ name, lineId, year }) => {
  return await db.models.Models.create({ name, line_id: lineId, year });
};

exports.updateModel = async ({ id, name, line_id, year }) => {
  return await db.models.Models.update(
    {
      ...(name ? { name } : {}),
      ...(line_id ? { line_id } : {}),
      ...(year ? { year } : {}),
    },
    { where: { status: 1, id } }
  );
};

exports.disableModel = async (id) => {
  return await db.models.Models.update(
    { status: 0 },
    { where: { status: 1, id } }
  );
};

exports.getTransmissionsTypes = async ({ status = 1, id, name }) => {
  return await db.models.TransmissionsTypes.findAll({
    where: {
      status,
      ...(id ? { id } : {}),
      ...(name ? { name: { [Op.like]: `%${name}%` } } : {}),
    },
  });
};

exports.addTransmissionType = async (name) => {
  return await db.models.TransmissionsTypes.create({ name });
};

exports.updateTransmissionType = async ({ id, name }) => {
  return await db.models.TransmissionsTypes.update(
    { name },
    { where: { status: 1, id } }
  );
};

exports.disableTransmissionType = async (id) => {
  return await db.models.TransmissionsTypes.update(
    { status: 0 },
    { where: { status: 1, id } }
  );
};

exports.getFuelTypes = async ({ status = 1, id, name }) => {
  return await db.models.FuelTypes.findAll({
    where: {
      status,
      ...(id ? { id } : {}),
      ...(name ? { name: { [Op.like]: `%${name}%` } } : {}),
    },
  });
};

exports.addFuelType = async (name) => {
  return await db.models.FuelTypes.create({ name });
};

exports.updateFuelType = async ({ id, name }) => {
  return await db.models.FuelTypes.update(
    { name },
    { where: { status: 1, id } }
  );
};

exports.disableFuelType = async (id) => {
  return await db.models.FuelTypes.update(
    { status: 0 },
    { where: { status: 1, id } }
  );
};

exports.getVehicles = async ({
  status = 1,
  id,
  plate,
  color,
  transmissionType,
  fuelType,
  modelId,
  lineId,
  brandId,
}) => {
  return await db.models.Vehicles.findAll({
    where: {
      status,
      ...(id ? { id } : {}),
      ...(plate ? { plate: { [Op.like]: `%${plate}%` } } : {}),
      ...(color ? { color: { [Op.like]: `%${color}%` } } : {}),
      ...(transmissionType ? { transmissionType } : {}),
      ...(fuelType ? { fuelType } : {}),
      ...(modelId ? { modelId } : {}),
    },
    include: [
      {
        model: db.models.Models,
        as: "model",
        where: {
          status: 1,
          ...(lineId ? { lineId } : {}),
        },
        include: [
          {
            model: db.models.CarLines,
            as: "line",
            where: { status: 1, ...(brandId ? { brandId } : {}) },
            include: [
              {
                model: db.models.Brands,
                as: "brand",
                where: { status: 1 },
              },
            ],
          },
        ],
      },
    ],
  });
};

exports.addVehicle = async ({
  modelId,
  userId,
  vim,
  color,
  engineNumber,
  mileage,
  plateNumber,
  fuelType,
  transmissionType,
  registrationDate,
  description,
  imageUrl,
}) => {
  return await db.models.Vehicles.create({
    model_id: modelId,
    user_id: userId,
    vim,
    color,
    engine_number: engineNumber,
    mileage,
    plate_number: plateNumber,
    fuel_type: fuelType,
    transmission_type: transmissionType,
    registration_date: registrationDate,
    description,
    image_url: imageUrl,
  });
};

exports.updateVehicle = async ({
  id,
  plate,
  color,
  transmissionType,
  fuelType,
  modelId,
}) => {
  return await db.models.Vehicles.update(
    { plate, color, transmissionType, fuelType, modelId },
    { where: { status: 1, id } }
  );
};

exports.disableVehicle = async (id) => {
  return await db.models.Vehicles.update(
    { status: 0 },
    { where: { status: 1, id } }
  );
};
