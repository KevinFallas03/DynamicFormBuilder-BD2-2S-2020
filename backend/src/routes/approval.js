const express = require("express");
const router = express.Router();

const approvalController = require("../controllers/approvalController");

router.get("/templates/:id", approvalController.get);

router.get("/pending/byUser/:userId", approvalController.getPendingByUser);

router.get("/pending/:id", approvalController.getPending);

router.get("/templates/byAuthor/:id", approvalController.getTemplatesByAuthor);

router.post("/", approvalController.create);

router.put("/", approvalController.edit);

router.delete("/:approvalId", approvalController.delete);

// dev-mode
// router.delete("/", approvalController.deleteMany);

module.exports = router;