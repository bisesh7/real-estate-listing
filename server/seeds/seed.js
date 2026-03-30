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
      {
        title: "Budget Apartment in Koteshwor",
        description: "Affordable apartment near ring road.",
        price: 8000000,
        beds: 2,
        baths: 1,
        suburb: "Koteshwor",
        type: "Apartment",
        agentId: agents[0].id,
        internalNotes: "Good for first-time buyers",
      },
      {
        title: "Spacious House in Bhaktapur",
        description: "Traditional style house with modern interior.",
        price: 20000000,
        beds: 4,
        baths: 3,
        suburb: "Bhaktapur",
        type: "House",
        agentId: agents[1].id,
        internalNotes: "Tourist attraction nearby",
      },
      {
        title: "Studio Apartment in Patan",
        description: "Compact living space in Lalitpur.",
        price: 6000000,
        beds: 1,
        baths: 1,
        suburb: "Patan",
        type: "Apartment",
        agentId: agents[0].id,
        internalNotes: "Ideal for students",
      },
      {
        title: "Luxury Villa in Budhanilkantha",
        description: "Premium villa with mountain views.",
        price: 50000000,
        beds: 6,
        baths: 5,
        suburb: "Budhanilkantha",
        type: "House",
        agentId: agents[1].id,
        internalNotes: "High-end clients only",
      },
      {
        title: "Apartment in Kalanki",
        description: "Convenient location with easy transport access.",
        price: 9000000,
        beds: 2,
        baths: 2,
        suburb: "Kalanki",
        type: "Apartment",
        agentId: agents[0].id,
        internalNotes: "Near bus park",
      },
      {
        title: "House in Kirtipur",
        description: "Peaceful environment with scenic views.",
        price: 18000000,
        beds: 3,
        baths: 2,
        suburb: "Kirtipur",
        type: "House",
        agentId: agents[1].id,
        internalNotes: "Growing area",
      },
      {
        title: "Apartment in Dillibazar",
        description: "Central location close to offices.",
        price: 13000000,
        beds: 2,
        baths: 2,
        suburb: "Dillibazar",
        type: "Apartment",
        agentId: agents[0].id,
        internalNotes: "High rental demand",
      },
      {
        title: "House in Gongabu",
        description: "Affordable house near new bus park.",
        price: 14000000,
        beds: 3,
        baths: 2,
        suburb: "Gongabu",
        type: "House",
        agentId: agents[1].id,
        internalNotes: "Busy area",
      },
      {
        title: "Penthouse in Boudha",
        description: "Premium penthouse with monastery view.",
        price: 35000000,
        beds: 4,
        baths: 3,
        suburb: "Boudha",
        type: "Apartment",
        agentId: agents[0].id,
        internalNotes: "Luxury segment",
      },
      {
        title: "House in Imadol",
        description: "Quiet suburban house in Lalitpur.",
        price: 16000000,
        beds: 3,
        baths: 2,
        suburb: "Imadol",
        type: "House",
        agentId: agents[1].id,
        internalNotes: "Family-friendly area",
      },
      {
        title: "Apartment in Teku",
        description: "Near business district and hospitals.",
        price: 11000000,
        beds: 2,
        baths: 2,
        suburb: "Teku",
        type: "Apartment",
        agentId: agents[0].id,
        internalNotes: "Good resale value",
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
