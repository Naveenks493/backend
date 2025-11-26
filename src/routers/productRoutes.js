const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/authMiddleware");
const productController = require("../controllers/productController");
const uploads = require("../middleware/uploads");

router.post("/create", protect, adminOnly,uploads.single("image") , productController.createProduct);
router.put("/update/:id", protect, adminOnly,uploads.single("image"), productController.updateProduct);
router.delete("/delete/:id", protect, adminOnly, productController.deleteProduct);

router.get("/get", productController.showallProduct);
router.get("/getbyid/:id", productController.showProductById);

module.exports = router;
