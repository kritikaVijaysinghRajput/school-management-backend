const { Sequelize } = require("sequelize");
require("dotenv").config();

const connectionString = process.env.DB_CONNECTION_STRING;

if (!connectionString) {
  throw new Error(
    "Database connection string is not defined in environment variables."
  );
}

const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
