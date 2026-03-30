import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import listingsRouter from "./routes/listings.js";
import initDB from "./db/init.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/listings", listingsRouter);

initDB().then(() => {
  app.listen(process.env.PORT || 5001, () =>
    console.log(`Server running on port ${process.env.PORT || 5001}`),
  );
});
