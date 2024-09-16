const express = require("express");
const router = express.Router();
const { saveInput, getDiseases } = require("../controllers/input_controllers");


router.post("/input", saveInput);
router.get("/diseases", getDiseases);

module.exports = router;
