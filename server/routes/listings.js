import express from "express";
import Property from "../models/Property.js";
import Agent from "../models/Agent.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const {
      suburb,
      price_min,
      price_max,
      beds,
      baths,
      type,
      page = 1,
      limit = 10,
    } = req.query;

    const where = {};
    if (suburb) where.suburb = suburb;
    if (type) where.type = type;
    if (beds) where.beds = beds;
    if (baths) where.baths = baths;
    if (price_min || price_max) {
      where.price = {};
      if (price_min) where.price[Op.gte] = Number(price_min);
      if (price_max) where.price[Op.lte] = Number(price_max);
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Property.findAndCountAll({
      where,
      include: { model: Agent, attributes: ["id", "name", "email"] },
      limit: Number(limit),
      offset,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      total: count,
      page: Number(page),
      limit: Number(limit),
      properties: rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const property = await Property.findByPk(id, { include: Agent });
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    const prop = property.toJSON();
    if (!req.user?.isAdmin) delete prop.internalNotes;

    res.json(prop);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
