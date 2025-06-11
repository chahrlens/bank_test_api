const createError = require("http-errors");
const vehicleRepository = require("../repository/vehicles.repository");

exports.getUsers = async (req, res, next) => {
  try {
    const { status, id, fullName } = req.query;
    const users = await vehicleRepository.getUsers({ status, id, fullName });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const { fullName } = req.body;
    if (!fullName) {
      return next(createError(400, "Full name is required"));
    }
    const user = await vehicleRepository.addUser(fullName);
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id, fullName } = req.body;
    if (!id || !fullName) {
      return next(createError(400, "ID and full name are required"));
    }
    const user = await vehicleRepository.updateUser({ id, fullName });
    if (user[0] === 0) {
      return next(createError(404, "User not found or not updated"));
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.disableUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(createError(400, "ID is required"));
    }
    const user = await vehicleRepository.disableUser(id);
    if (user[0] === 0) {
      return next(createError(404, "User not found or not disabled"));
    }
    res.status(200).json({ message: "User disabled successfully" });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.getBrands = async (req, res, next) => {
  try {
    const { status, id, name } = req.query;
    const brands = await vehicleRepository.getBrands({ status, id, name });
    res.status(200).json(brands);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.addBrand = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return next(createError(400, "Brand name is required"));
    }
    const brand = await vehicleRepository.addBrand(name);
    res.status(201).json(brand);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.updateBrand = async (req, res, next) => {
  try {
    const { id, name } = req.body;
    if (!id || !name) {
      return next(createError(400, "ID and brand name are required"));
    }
    const brand = await vehicleRepository.updateBrand({ id, name });
    if (brand[0] === 0) {
      return next(createError(404, "Brand not found or not updated"));
    }
    res.status(200).json({ message: "Brand updated successfully" });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.disableBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(createError(400, "ID is required"));
    }
    const brand = await vehicleRepository.disableBrand(id);
    if (brand[0] === 0) {
      return next(createError(404, "Brand not found or not disabled"));
    }
    res.status(200).json({ message: "Brand disabled successfully" });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.getLines = async (req, res, next) => {
  try {
    const { status, id, name, brandId } = req.query;
    const lines = await vehicleRepository.getLines({
      status,
      id,
      name,
      brandId,
    });
    res.status(200).json(lines);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.addLine = async (req, res, next) => {
  try {
    const { name, brandId } = req.body;
    if (!name || !brandId) {
      return next(createError(400, "Line name and brand ID are required"));
    }
    const line = await vehicleRepository.addLine({ name, brandId });
    res.status(201).json(line);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.updateLine = async (req, res, next) => {
  try {
    const { id, name } = req.body;
    if (!id || !name) {
      return next(createError(400, "ID and line name are required"));
    }
    const line = await vehicleRepository.updateLine({ id, name });
    if (line[0] === 0) {
      return next(createError(404, "Line not found or not updated"));
    }
    res.status(200).json({ message: "Line updated successfully" });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.disableLine = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(createError(400, "ID is required"));
    }
    const line = await vehicleRepository.disableLine(id);
    if (line[0] === 0) {
      return next(createError(404, "Line not found or not disabled"));
    }
    res.status(200).json({ message: "Line disabled successfully" });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.getModels = async (req, res, next) => {
  try {
    const { status, id, name, lineId, year } = req.query;
    const models = await vehicleRepository.getModels({
      status,
      id,
      name,
      lineId,
      year,
    });
    res.status(200).json(models);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.addModel = async (req, res, next) => {
  try {
    const { name, lineId, year } = req.body;
    if (!name || !lineId || !year) {
      return next(
        createError(400, "Model name, line ID, and year are required")
      );
    }
    const model = await vehicleRepository.addModel({ name, lineId, year });
    res.status(201).json(model);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.updateModel = async (req, res, next) => {
  try {
    const { id, name, lineId, year } = req.body;
    if (!id || !name || !lineId || !year) {
      return next(
        createError(400, "ID, model name, line ID, and year are required")
      );
    }
    const model = await vehicleRepository.updateModel({
      id,
      name,
      lineId,
      year,
    });
    if (model[0] === 0) {
      return next(createError(404, "Model not found or not updated"));
    }
    res.status(200).json({ message: "Model updated successfully" });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.disableModel = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(createError(400, "ID is required"));
    }
    const model = await vehicleRepository.disableModel(id);
    if (model[0] === 0) {
      return next(createError(404, "Model not found or not disabled"));
    }
    res.status(200).json({ message: "Model disabled successfully" });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.getTransmissionsTypes = async (req, res, next) => {
  try {
    const { status, id, name } = req.query;
    const transmissions = await vehicleRepository.getTransmissionsTypes({
      status,
      id,
      name,
    });
    res.status(200).json(transmissions);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.addTransmissionType = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return next(createError(400, "Transmission type name is required"));
    }
    const transmission = await vehicleRepository.addTransmissionType(name);
    res.status(201).json(transmission);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.updateTransmissionType = async (req, res, next) => {
  try {
    const { id, name } = req.body;
    if (!id || !name) {
      return next(
        createError(400, "ID and transmission type name are required")
      );
    }
    const transmission = await vehicleRepository.updateTransmissionType({
      id,
      name,
    });
    if (transmission[0] === 0) {
      return next(
        createError(404, "Transmission type not found or not updated")
      );
    }
    res.status(200).json({ message: "Transmission type updated successfully" });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.disableTransmissionType = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(createError(400, "ID is required"));
    }
    const transmission = await vehicleRepository.disableTransmissionType(id);
    if (transmission[0] === 0) {
      return next(
        createError(404, "Transmission type not found or not disabled")
      );
    }
    res
      .status(200)
      .json({ message: "Transmission type disabled successfully" });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.getFuelTypes = async (req, res, next) => {
  try {
    const { status, id, name } = req.query;
    const fuels = await vehicleRepository.getFuelTypes({ status, id, name });
    res.status(200).json(fuels);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.addFuelType = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      return next(createError(400, "Fuel type name is required"));
    }
    const fuel = await vehicleRepository.addFuelType(name);
    res.status(201).json(fuel);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.updateFuelType = async (req, res, next) => {
  try {
    const { id, name } = req.body;
    if (!id || !name) {
      return next(createError(400, "ID and fuel type name are required"));
    }
    const fuel = await vehicleRepository.updateFuelType({ id, name });
    if (fuel[0] === 0) {
      return next(createError(404, "Fuel type not found or not updated"));
    }
    res.status(200).json({ message: "Fuel type updated successfully" });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.disableFuelType = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(createError(400, "ID is required"));
    }
    const fuel = await vehicleRepository.disableFuelType(id);
    if (fuel[0] === 0) {
      return next(createError(404, "Fuel type not found or not disabled"));
    }
    res.status(200).json({ message: "Fuel type disabled successfully" });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.getVehicles = async (req, res, next) => {
  try {
    const {
      status,
      id,
      plate,
      color,
      transmissionType,
      fuelType,
      modelId,
      lineId,
      brandId,
    } = req.query;

    const vehicles = await vehicleRepository.getVehicles({
      status,
      id,
      plate,
      color,
      transmissionType,
      fuelType,
      modelId,
      lineId,
      brandId,
    });

    res.status(200).json(vehicles);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.addVehicle = async (req, res, next) => {
  try {
    const {
      plate,
      color,
      transmissionType,
      fuelType,
      modelId,
      engineNumber,
      vim,
      mileage,
      registrationDate,
      imageUrl,
      description,
      userId,
    } = req.body;

    if (
      !vim ||
      !engineNumber ||
      !color ||
      !transmissionType ||
      !fuelType ||
      !modelId
    ) {
      return next(
        createError(
          400,
          "Color, transmission type, fuel type, and model ID are required"
        )
      );
    }
    const vehicle = await vehicleRepository.addVehicle({
      plate,
      color,
      transmissionType,
      fuelType,
      modelId,
      engineNumber,
      vim,
      mileage,
      registrationDate,
      imageUrl,
      description,
      userId,
    });
    res.status(201).json(vehicle);
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.updateVehicle = async (req, res, next) => {
  try {
    const { id, plate, color, transmissionType, fuelType, modelId, engineNumber, vim, mileage, registrationDate, imageUrl, description } = req.body;
    if (!id || !color || !transmissionType || !fuelType || !modelId) {
      return next(
        createError(
          400,
          "ID, color, transmission type, fuel type, and model ID are required"
        )
      );
    }
    const vehicle = await vehicleRepository.updateVehicle({
      id,
      plate,
      color,
      transmissionType,
      fuelType,
      modelId,
      engineNumber,
      vim,
      mileage,
      registrationDate,
      imageUrl,
      description,
    });
    if (vehicle[0] === 0) {
      return next(createError(404, "Vehicle not found or not updated"));
    }
    res.status(200).json({ message: "Vehicle updated successfully" });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};

exports.disableVehicle = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(createError(400, "ID is required"));
    }
    const vehicle = await vehicleRepository.disableVehicle(id);
    if (vehicle[0] === 0) {
      return next(createError(404, "Vehicle not found or not disabled"));
    }
    res.status(200).json({ message: "Vehicle disabled successfully" });
  } catch (error) {
    console.log(error);
    next(createError(500, "Internal Server Error"));
  }
};
