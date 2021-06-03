const express = require("express");
const { getPosts, createPost } = require("../controllers/post");
const store = require("../middleware/multer");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.get("/", protect, getPosts);
router.post("/", protect, store.single("photo"), createPost);

module.exports = router;
