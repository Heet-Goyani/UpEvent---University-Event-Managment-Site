import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

let dbname = process.env.DATABASE_DBNAME || "upevent";
let hostname = process.env.DATABASE_HOSTNAME || "localhost";
let username = process.env.DATABASE_USERNAME || "root";
let password = process.env.DATABASE_PASSWORD || "root";

const sequelize = new Sequelize(dbname, username, password, {
  host: hostname,
  dialect: "mysql",
  define: {
    freezeTableName: true,
    // timestamps: false,
    // underscored: true
  },
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.query("CREATE DATABASE IF NOT EXISTS upevent;");
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export { sequelize, testConnection };
