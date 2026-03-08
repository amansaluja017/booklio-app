import path from "path";
import dotenv from "dotenv";
const root = __dirname.includes("dist") ? path.join(__dirname, "..", "..") : __dirname;
dotenv.config({ path: path.join(root, ".env") });

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDatabase } from "./db";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

import customerRoutes from "./routes/customer.route";
import providerRoutes from "./routes/provider.route";
import adminRoutes from "./routes/admin.route";
import categoryRoutes from "./routes/category.route";
import serviceRoutes from "./routes/services.route";
import bookingRoutes from "./routes/booking.route";
import reviewRoutes from "./routes/review.router";
import searchRoutes from "./routes/search.route";
import suggestionRoutes from "./routes/suggestion.router";

app.use("/api/v1/customer", customerRoutes);
app.use("/api/v1/provider", providerRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/service", serviceRoutes);
app.use("/api/v1/booking", bookingRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1", searchRoutes);
app.use("/api/v1", suggestionRoutes);


connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Express server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
