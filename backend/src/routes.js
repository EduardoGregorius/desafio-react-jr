const express = require("express");
const router = express.Router();

const productController = require("./controllers/productController");

router.get("/produtos", productController.getProducts);
router.get("/produto/:codigo", productController.getProduct);
router.post("/produto", productController.insert);
router.put("/produto/:codigo", productController.update);
router.delete("/produto/:codigo", productController.delete);

module.exports = router;