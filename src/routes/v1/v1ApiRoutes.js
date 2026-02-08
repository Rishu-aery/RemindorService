const express = require("express");
const { create } = require("../../controllers/emailController.js")

const router = express.Router();

router.post("/ticket", create);

module.exports = router;
