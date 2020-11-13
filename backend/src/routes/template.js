const express = require("express");
const router = express.Router();

const templatesController = require("../controllers/template");

router.get("/", templatesController.get);

router.get("/:id", templatesController.getById);

router.post("/", templatesController.create);

router.put("/:id", templatesController.edit);

router.delete("/", templatesController.delete);

module.exports = router;