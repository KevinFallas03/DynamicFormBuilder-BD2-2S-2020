const express = require("express");
const router = express.Router();

const formController = require("../controllers/form");

router.get("/requested/:id", formController.getRequested); 

router.get("/approvedByMe/:id", formController.getApprovedByMe); 

router.get("/denegatedByMe/:id", formController.getDenegatedByMe); 

router.get("/approved/:id", formController.getApprovedByMe); 

router.get("/denegated/:id", formController.getDenegatedByMe); 

router.get("/pending/:id", formController.getPending); 

router.get("/:id", formController.getById); 

router.put("/approved/:info", formController.edit); // hace la funcion de aprobar

router.delete("/", formController.delete);

module.exports = router;

