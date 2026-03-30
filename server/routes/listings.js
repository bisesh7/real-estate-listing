import express from "express";
import Property from "../models/Property.js";
import Agent from "../models/Agent.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const {
      suburb,
      type,
      price_min,
      price_max,
      beds,
      baths,
      keyword,
      page = 1,
    } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;

    const where = {};

    if (suburb) where.suburb = suburb;
    if (type) where.type = type;
    if (price_min) where.price = { ...where.price, $gte: Number(price_min) };
    if (price_max) where.price = { ...where.price, $lte: Number(price_max) };
    if (beds) where.beds = Number(beds);
    if (baths) where.baths = Number(baths);
    if (keyword) where.title = { $iLike: `%${keyword}%` };

    const properties = await Property.findAll({
      where,
      include: { model: Agent, attributes: ["id", "name", "email"] },
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });

    // Remove internalNotes for non-admins
    const user = req.user;
    const result = properties.map((p) => {
      const prop = p.toJSON();
      if (!user?.isAdmin) delete prop.internalNotes;
      return prop;
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
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
