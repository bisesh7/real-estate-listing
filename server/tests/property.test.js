import request from "supertest";
import app from "../index.js"; // your express app
import sequelize from "../db/sequelize.js";
import Property from "../models/Property.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "testsecret";

let adminToken;
let userToken;

beforeAll(async () => {
  // Sync database
  await sequelize.sync({ force: true });

  // Seed users
  const admin = await User.create({
    name: "admin",
    email: "admin@test.com",
    password: "password",
    isAdmin: true,
  });

  const user = await User.create({
    name: "user",
    email: "user@test.com",
    password: "password",
    isAdmin: false,
  });

  adminToken = jwt.sign({ id: admin.id }, JWT_SECRET);
  userToken = jwt.sign({ id: user.id }, JWT_SECRET);

  // Seed properties
  await Property.bulkCreate([
    {
      title: "Test Property 1",
      description: "Lovely apartment in Kathmandu",
      suburb: "Kathmandu",
      price: 5000000,
      beds: 3,
      baths: 2,
      type: "Apartment",
      internalNotes: "Admin only note 1",
    },
    {
      title: "Test Property 2",
      description: "Spacious house in Bhaktapur",
      suburb: "Bhaktapur",
      price: 7000000,
      beds: 4,
      baths: 3,
      type: "House",
      internalNotes: "Admin only note 2",
    },
  ]);
});

afterAll(async () => {
  await sequelize.close();
});

describe("GET /api/listings", () => {
  test("should return all properties for admin including internal notes", async () => {
    const res = await request(app)
      .get("/api/listings")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.properties.length).toBe(2);
    expect(res.body.properties[0]).toHaveProperty("internalNotes");
  });

  test("should return properties with internal notes for admin user", async () => {
    const res = await request(app)
      .get("/api/listings")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.properties.length).toBe(2);
    expect(res.body.properties[0]).toHaveProperty("internalNotes");
  });

  test("should filter properties by beds >= 4", async () => {
    const res = await request(app)
      .get("/api/listings?beds=4")
      .set("Authorization", `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.properties.length).toBe(1);
    expect(res.body.properties[0].beds).toBeGreaterThanOrEqual(4);
  });
});
