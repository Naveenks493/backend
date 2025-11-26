const userModel = require("../models/poojamodel");
const bcrypt = require("bcrypt");
const generateToken = require("../middleware/poojatoken");

// Register
const userRegister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existsUser = await userModel.findOne({ email });
    if (existsUser) {
      return res.status(400).send({ message: "You are already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // First user becomes admin, rest default to "user"
    const isFirstUser = (await userModel.countDocuments()) === 0;

    const userData = await new userModel({
      name,
      email,
      password: hashedPassword,
      role: isFirstUser ? "admin" : role || "user",
    }).save();

    res.status(201).send({
      message: "User registered successfully",
      user: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
    });
  } catch (error) {
    res.status(error.status || 500).send({
      message: error.message || "Error while creating user",
    });
  }
};

// Login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existsUser = await userModel.findOne({ email });

    if (!existsUser) {
      return res.status(404).send({ message: "You are not registered" });
    }

    const isMatch = await bcrypt.compare(password, existsUser.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Incorrect credentials" });
    }

    const token = generateToken({
      id: existsUser._id,
      role: existsUser.role,
    });

    res.status(200).send({
      message: "User login successful",
      token,
      user: {
        id: existsUser._id,
        name: existsUser.name,
        email: existsUser.email,
        role: existsUser.role,
      },
    });
  } catch (error) {
    res.status(error.statusCode || 500).send({
      message: error.message || "Error while login",
    });
  }
};

module.exports = { userRegister, userLogin };
