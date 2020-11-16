const express = require("express");
const router = express.Router();

const formController = require("../controllers/form");

router.get("/requested/:id", formController.getRequested); // tengo que sacar el user actual

router.get("/", formController.getAproved); // aproved

router.get("/pending/:id", formController.getPending); // pending

router.get("/", formController.getAll); // getAll

router.get("/:id", formController.getById); // getAll

router.post("/", formController.create);

router.put("/approved/:info", formController.edit); // hace la funcion de aprobar

router.delete("/", formController.delete);

module.exports = router;

