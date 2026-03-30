import express from "express";
import Property from "../models/Property.js";
import Agent from "../models/Agent.js";
import { Op } from "sequelize";
import { authMiddleware } from "../middlewares/auth.js";

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
      keyword,
      page = 1,
      limit = 10,
    } = req.query;

    const where = {};

    // String filters
    if (suburb) {
      where.suburb = { [Op.iLike]: `%${suburb}%` };
    }

    if (type) {
      where.type = { [Op.iLike]: `%${type}%` };
    }

    if (beds && !isNaN(beds)) {
      where.beds = { [Op.gte]: Number(beds) };
    }
    if (baths && !isNaN(baths)) {
      where.baths = { [Op.gte]: Number(baths) };
    }

    if ((price_min && !isNaN(price_min)) || (price_max && !isNaN(price_max))) {
      where.price = {};
      if (price_min && !isNaN(price_min))
        where.price[Op.gte] = Number(price_min);
      if (price_max && !isNaN(price_max))
        where.price[Op.lte] = Number(price_max);
    }

    if (keyword) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${keyword}%` } },
        { description: { [Op.iLike]: `%${keyword}%` } },
      ];
    }

    const offset = (Number(page) - 1) * Number(limit);

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
    console.error("Error fetching properties:", err);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  console.log(req.user);

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
