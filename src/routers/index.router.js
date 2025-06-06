const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();
const vehiclesRouter = require("./vehicles.router");
const authRouter = require("./auth.router");

router.get("/health-check", (req, res) => {
  const response = `Health check successful! API is running. Version: ${
    process.env.BUILD_VERSION || "1.0.0"
  }`;
  res.status(200).json({
    status: "success",
    payload: response,
  });
});

router.use("/catalogs", authMiddleware.verifyToken, vehiclesRouter);
router.use("/auth", authMiddleware.verifyToken, authRouter);

module.exports = router;
