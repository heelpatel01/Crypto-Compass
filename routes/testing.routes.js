const express = require("express");
const router = express.Router();
const { testingRail } = require("../controllers/testing.controller");

router.get("/yotest", testingRail);

module.exports = router;
