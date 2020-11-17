const express = require("express");
const router = express.Router();

const templatesController = require("../controllers/template");

router.get("/many/:ids", templatesController.getManyById);

router.get("/:id", templatesController.getById);

router.post("/", templatesController.create);

router.put("/:id", templatesController.edit);

router.delete("/:id", templatesController.delete);

module.exports = router;