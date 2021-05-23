const express = require("express");
const {
  getMyProfile,
  createProfile,
  getProfiles,
  getProfile,
} = require("../controllers/profile");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/", protect, createProfile);
router.get("/", protect, getProfiles);
router.get("/:user_id", protect, getProfile);

router.get("/myprofile", protect, getMyProfile);

module.exports = router;
