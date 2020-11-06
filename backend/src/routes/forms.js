const express = require("express");
const router = express.Router();

const formsController = require("../controllers/forms");

router.get("/", formsController.get);

router.post("/", formsController.create);

router.put("/", formsController.edit);

router.delete("/", formsController.delete);

module.exports = router;