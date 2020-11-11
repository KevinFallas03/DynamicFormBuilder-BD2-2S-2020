const express = require("express");
const router = express.Router();

const approvalController = require("../controllers/approvalController");

router.get("/:templateName", approvalController.get);

router.post("/", approvalController.create);

router.put("/", approvalController.edit);

router.delete("/:approvalId", approvalController.delete);

module.exports = router;