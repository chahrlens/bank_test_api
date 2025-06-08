const express = require("express");
const vehicleController = require("../controllers/vehicles.controller");

const router = express.Router();

router.get("/users", vehicleController.getUsers);
router.post("/users", vehicleController.addUser);
router.put("/users", vehicleController.updateUser);
router.delete("/users/:id", vehicleController.disableUser);

router.get("/brands", vehicleController.getBrands);
router.post("/brands", vehicleController.addBrand);
router.put("/brands", vehicleController.updateBrand);
router.delete("/brands/:id", vehicleController.disableBrand);

router.get("/lines", vehicleController.getLines);
router.post("/lines", vehicleController.addLine);
router.put("/lines", vehicleController.updateLine);
router.delete("/lines/:id", vehicleController.disableLine);

router.get("/models", vehicleController.getModels);
router.post("/models", vehicleController.addModel);
router.put("/models", vehicleController.updateModel);
router.delete("/models/:id", vehicleController.disableModel);

router.get("/transmissions-types", vehicleController.getTransmissionsTypes);
router.post("/transmissions-types", vehicleController.addTransmissionType)
router.put("/transmissions-types", vehicleController.updateTransmissionType);
router.delete("/transmissions-types/:id", vehicleController.disableTransmissionType);

router.get("/fuel-types", vehicleController.getFuelTypes);
router.post("/fuel-types", vehicleController.addFuelType);
router.put("/fuel-types", vehicleController.updateFuelType);
router.delete("/fuel-types/:id", vehicleController.disableFuelType);

router.get("/vehicles", vehicleController.getVehicles);
router.post("/vehicles", vehicleController.addVehicle);
router.put("/vehicles", vehicleController.updateVehicle);
router.delete("/vehicles/:id", vehicleController.disableVehicle);

module.exports = router;
