const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwt_secret = process.env.JWT_SECRET;

const generateToken = (id) => {
  return jwt.sign(id, jwt_secret, { expiresIn: "7d" });
};

module.exports = generateToken;
