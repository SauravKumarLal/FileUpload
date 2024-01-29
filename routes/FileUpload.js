//express ka instance lata hu, & express ka instance use kar k "router" lete hain!
const express = require("express");
const router = express.Router();

//saare handlers leke aate hai controller se
const {localFileUpload} = require("../controllers/fileUpload");

//api routes
router.post("/localFileUpload", localFileUpload);

module.exports = router;


