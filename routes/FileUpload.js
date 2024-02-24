//express ka instance lata hu, & express ka instance use kar k "router" lete hain!
const express = require("express");
const router = express.Router();

//saare handlers leke aate hai controller se
const {localFileUpload, imageUpload, videoUpload, imageSizeReducer} = require("../controllers/fileUpload"); //import all

//api routes
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducer);


module.exports = router;


