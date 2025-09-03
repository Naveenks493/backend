const mongoose = require("mongoose");
const server = require("./app");
require("dotenv").config();

const mongodb_uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;

if (!mongodb_uri) {
  console.error(" MONGODB_URI is not set in .env file");
  process.exit(1);
}

mongoose
  .connect(mongodb_uri)
  .then(() => {
    console.log("MongoDB connected");
    server.listen(port, () => {
      console.log(` Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err.message);
    process.exit(1);
  });
