const Sequelize = require("sequelize");
const initModels = require("./init-models");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: process.env.ENABLE_LOGGING === "true" ? console.log : false,
    pool: {
      max: parseInt(process.env.DB_POOL_MAX, 10) || 5,
      min: parseInt(process.env.DB_POOL_MIN, 10) || 0,
      acquire: parseInt(process.env.DB_ACQUIRING_TIMEOUT, 10) || 30000,
      idle: parseInt(process.env.DB_IDLE_TIMEOUT, 10) || 10000,
    },
  }
);

const db = {
  Sequelize: Sequelize,
  models: initModels(sequelize),
};

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connect();
module.exports = db;
