const express = require("express");
const {
  register,
  login,
  logout,
  confirmEmail,
  // getMe,
  // forgotPassword,
  // resetPassword,
  // updateDetails,
  // updatepassword,
} = require("../controllers/auth");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/confirmemail", confirmEmail);
module.exports = router;
