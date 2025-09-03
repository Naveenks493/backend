const userModel = require('../models/poojamodel');
const bcrypt = require('bcrypt');
const generateToken = require('../middleware/poojatoken');

// Register
const userRegister = async (req, res) => {
  try {
    const user = req.body;

    const existsUser = await userModel.findOne({ email: user.email });
    if (existsUser) {
      return res.status(400).send({ message: "You are already registered" });
    }


    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const userData = await new userModel(user).save();
    res.status(201).send({
      message: "User successfully registered",
      user: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
      }
    });

  } catch (error) {
    res.status(error.status || 500).send({ 
      message: error.message || "Error while creating user" 
    });
  }
};

// Login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existsUser = await userModel.findOne({ email });

    if (!existsUser) {
      const error = new Error("You are not registered");
      error.statusCode = 404;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, existsUser.password);
    if (!isMatch) {
      const error = new Error("Incorrect credentials");
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(existsUser._id);

    res.status(200).send({
      message: "User login successfully",
      token,
      user: {
        id: existsUser._id,
        name: existsUser.name,
        email: existsUser.email,
      }
    });

  } catch (error) {
    res.status(error.statusCode || 500).send({
      message: error.message || "Error while login"
    });
  }
};

module.exports = { userRegister, userLogin };
