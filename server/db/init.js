import sequelize from "./sequelize.js";
import User from "../models/User.js";
import Agent from "../models/Agent.js";
import Property from "../models/Property.js";

const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({ alter: true });
    console.log("Models synchronized");
  } catch (err) {
    console.error("DB connection failed:", err);
  }
};

export default initDB;
