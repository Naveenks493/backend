const express = require("express");
const { userRegister, userLogin } = require("../controllers/poojacontroller");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);

router.get("/profile", protect, (req, res) => {
  res.json({ message: "Profile details", user: req.user });
})

router.post("/product", protect, adminOnly, (req, res) => {
  res.json({ message: "Product created by Admin" });
});

module.exports = router;
 