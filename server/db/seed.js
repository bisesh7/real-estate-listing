import sequelize from "../db/sequelize.js";
import User from "../models/User.js";
import Agent from "../models/Agent.js";
import Property from "../models/Property.js";
import bcrypt from "bcrypt";

const seed = async () => {
  try {
    // Drop & recreate tables
    await sequelize.sync({ force: true });
    console.log("Database synced");

    // -------- Users --------
    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = await User.bulkCreate([
      {
        name: "Admin User",
        email: "admin@gmail.com",
        password: hashedPassword,
        isAdmin: true,
      },
      {
        name: "Regular User",
        email: "user@gmail.com",
        password: hashedPassword,
        isAdmin: false,
      },
    ]);

    console.log("Users seeded");

    // -------- Agents --------
    const agents = await Agent.bulkCreate([
      { name: "John Doe", email: "john.doe@gmail.com" },
      { name: "Jane Doe", email: "jane.doe@gmail.com" },
    ]);

    console.log("Agents seeded");

    // -------- Properties --------
    const properties = await Property.bulkCreate([
      {
        title: "Modern Apartment in Lazimpat",
        description: "A stylish apartment in the heart of Kathmandu.",
        price: 12000000,
        beds: 2,
        baths: 2,
        suburb: "Lazimpat",
        type: "Apartment",
        agentId: agents[0].id,
        internalNotes: "High demand area, close to embassy district",
      },
      {
        title: "Cozy House in Baneshwor",
        description: "Quiet residential neighborhood, perfect for families.",
        price: 25000000,
        beds: 4,
        baths: 3,
        suburb: "Baneshwor",
        type: "House",
        agentId: agents[1].id,
        internalNotes: "Spacious backyard",
      },
      {
        title: "Luxury Apartment in Thamel",
        description: "Located in the tourist hub, fully furnished.",
        price: 15000000,
        beds: 3,
        baths: 2,
        suburb: "Thamel",
        type: "Apartment",
        agentId: agents[0].id,
        internalNotes: "Great for Airbnb",
      },
      {
        title: "Family House in Maharajgunj",
        description: "Well-connected area, near schools and shops.",
        price: 30000000,
        beds: 5,
        baths: 4,
        suburb: "Maharajgunj",
        type: "House",
        agentId: agents[1].id,
        internalNotes: "Needs minor renovation",
      },
    ]);

    console.log("Properties seeded");

    console.log("Seeding finished!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seed();
