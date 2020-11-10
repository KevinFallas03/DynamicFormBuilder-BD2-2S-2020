const express = require("express");
const router = express.Router();

const formController = require("../controllers/form");

router.get("/", formController.get);

router.post("/", formController.create);

router.put("/", formController.edit);

router.delete("/", formController.delete);

module.exports = router;