const express = require("express");
const { getMyProfile, createProfile } = require("../controllers/profile");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.get("/myprofile", protect, getMyProfile);
router.post("/createprofile", protect, createProfile);

module.exports = router;
