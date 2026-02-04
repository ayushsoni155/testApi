const express = require("express");
const quoteController = require("../controller/quotes.controller");
const router = express.Router();

router.get("/quote", quoteController.getAQuote);
router.post("/quote", quoteController.setAQuote);

module.exports = router;
