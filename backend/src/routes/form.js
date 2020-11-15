const express = require("express");
const router = express.Router();

const formController = require("../controllers/form");

router.get("/requested/:id", formController.getRequested); // tengo que sacar el user actual

router.get("/aproved/:id", formController.getAproved); // aproved

router.get("/pending/:id", formController.getPending); // pending

router.get("/", formController.getAll); // getAll

router.post("/", formController.create);

router.put("/", formController.edit);

router.delete("/", formController.delete);

module.exports = router;

