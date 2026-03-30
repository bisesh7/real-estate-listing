// server/db/sync.js
import sequelize from "./sequelize.js";
import User from "../models/User.js";
import Agent from "../models/Agent.js";
import Property from "../models/Property.js";

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("All tables synced successfully!");
  } catch (err) {
    console.error("Error syncing tables:", err);
  } finally {
    await sequelize.close();
  }
})();
