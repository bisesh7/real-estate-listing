import sequelize from "../db/sequelize.js";
import User from "../models/User.js";
import Agent from "../models/Agent.js";
import Property from "../models/Property.js";
import bcrypt from "bcrypt";

const seed = async () => {
  try {
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
        internalNotes: "Spacious backyard, great for kids",
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
        internalNotes: "Ideal for Airbnb rentals",
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
        title: "Penthouse in Lazimpat",
        description: "Spacious penthouse with city view.",
        price: 45000000,
        beds: 4,
        baths: 3,
        suburb: "Lazimpat",
        type: "Apartment",
        agentId: agents[0].id,
        internalNotes: "Luxury apartment, rooftop access",
      },
      {
        title: "Modern Villa in Jhamsikhel",
        description: "Quiet villa, private garden.",
        price: 60000000,
        beds: 6,
        baths: 5,
        suburb: "Jhamsikhel",
        type: "House",
        agentId: agents[1].id,
        internalNotes: "Recently renovated, premium finishes",
      },
      {
        title: "Compact Studio in Thamel",
        description: "Small, convenient for singles or students.",
        price: 7000000,
        beds: 1,
        baths: 1,
        suburb: "Thamel",
        type: "Studio",
        agentId: agents[0].id,
        internalNotes: "High turnover, good for short-term rental",
      },
      {
        title: "Eco-friendly Home in Patan",
        description: "Sustainable design, solar panels installed.",
        price: 32000000,
        beds: 3,
        baths: 3,
        suburb: "Patan",
        type: "House",
        agentId: agents[1].id,
        internalNotes: "Energy efficient, low maintenance",
      },
      {
        title: "Duplex Apartment in Baneshwor",
        description: "Two floors, modern amenities.",
        price: 28000000,
        beds: 3,
        baths: 2,
        suburb: "Baneshwor",
        type: "Apartment",
        agentId: agents[0].id,
        internalNotes: "Recently painted, good natural light",
      },
      {
        title: "Townhouse in Jawalakhel",
        description: "Connected units, secure community.",
        price: 35000000,
        beds: 4,
        baths: 3,
        suburb: "Jawalakhel",
        type: "House",
        agentId: agents[1].id,
        internalNotes: "Quiet area, near park",
      },
      {
        title: "Luxury Penthouse in Thamel",
        description: "Top floor with city skyline view.",
        price: 50000000,
        beds: 5,
        baths: 4,
        suburb: "Thamel",
        type: "Apartment",
        agentId: agents[0].id,
        internalNotes: "Exclusive listing, concierge service",
      },
      {
        title: "Single-family Home in Lalitpur",
        description: "Traditional style, big backyard.",
        price: 30000000,
        beds: 4,
        baths: 3,
        suburb: "Lalitpur",
        type: "House",
        agentId: agents[1].id,
        internalNotes: "Good investment potential",
      },
      {
        title: "Modern Loft in Lazimpat",
        description: "Open floor plan, great lighting.",
        price: 18000000,
        beds: 2,
        baths: 1,
        suburb: "Lazimpat",
        type: "Loft",
        agentId: agents[0].id,
        internalNotes: "Popular among young professionals",
      },
      {
        title: "Spacious Villa in Maharajgunj",
        description: "Large garden, private pool.",
        price: 75000000,
        beds: 6,
        baths: 5,
        suburb: "Maharajgunj",
        type: "House",
        agentId: agents[1].id,
        internalNotes: "Luxury listing, high resale value",
      },
      {
        title: "Cozy Apartment in Patan",
        description: "Well-connected, quiet building.",
        price: 15000000,
        beds: 2,
        baths: 2,
        suburb: "Patan",
        type: "Apartment",
        agentId: agents[0].id,
        internalNotes: "Good rental history",
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
