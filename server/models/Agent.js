import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";

const Agent = sequelize.define("Agent", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
});

export default Agent;
