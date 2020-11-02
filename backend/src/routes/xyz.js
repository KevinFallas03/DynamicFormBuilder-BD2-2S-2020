
/**
 * ROUTER EXAMPLE
 */

const express = require("express");
const router = express.Router();

const xyzController = require("../controllers/xyz");

router.get("/", xyzController.getXyz);

router.post("/", xyzController.createXyz);

router.put("/:id", xyzController.editXyz);

router.delete("/:id", xyzController.deleteXyz);

module.exports = router;