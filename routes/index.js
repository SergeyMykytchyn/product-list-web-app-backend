const Router = require("express");
const router = new Router();
const productRouter = require("./productRouter");
const commentRouter = require("./commentRouter");

router.use("/product", productRouter);
router.use("/comment", commentRouter);

module.exports = router;
