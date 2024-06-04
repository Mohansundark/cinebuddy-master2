const express = require("express");
const searchRoutes = require("./routes/search");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
app.use(express.json());

// Include Mongoose connection logic
const mongoURI = process.env.MONGODB_URL; // Replace with your MongoDB connection URI from .env

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Middleware for logging requests (optional)
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/search", searchRoutes);
app.use("/api/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
