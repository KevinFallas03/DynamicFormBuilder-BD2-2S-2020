const express = require("express");
const router = express.Router();

const formController = require("../controllers/form");

router.get("/requested", formController.getRequested); //requested

router.get("/aproved/:id", formController.getAproved); // aproved

router.get("/pending/:idList", formController.getPending); // pending

router.post("/", formController.create);

router.put("/", formController.edit);

router.delete("/", formController.delete);

module.exports = router;

