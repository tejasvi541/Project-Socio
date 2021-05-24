const express = require("express");
const {
  getMyProfile,
  createProfile,
  getProfiles,
  getProfile,
  addEducation,
  deleteEducation,
} = require("../controllers/profile");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/", protect, createProfile);
router.get("/", protect, getProfiles);
router.get("/:user_id", protect, getProfile);
router.put("/education", protect, addEducation);
router.delete("/education/:edu_id", protect, deleteEducation);

router.get("/myprofile", protect, getMyProfile);

module.exports = router;
