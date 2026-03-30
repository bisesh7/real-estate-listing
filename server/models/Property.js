import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";
import Agent from "./Agent.js";

const Property = sequelize.define(
  "Property",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    beds: { type: DataTypes.INTEGER, allowNull: false },
    baths: { type: DataTypes.INTEGER, allowNull: false },
    suburb: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    internalNotes: { type: DataTypes.TEXT, allowNull: true },
  },
  {
    indexes: [
      { fields: ["price"] },
      { fields: ["suburb"] },
      { fields: ["type"] },
      { fields: ["price", "suburb"] },
    ],
  },
);

Property.belongsTo(Agent, { foreignKey: "agentId" });
Agent.hasMany(Property, { foreignKey: "agentId" });

export default Property;
