const express = require("express");
const { getPosts } = require("../controllers/post");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.get("/", protect, getPosts);

module.exports = router;
