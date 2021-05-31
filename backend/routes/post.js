const express = require("express");
const { getPosts, createPost, upload } = require("../controllers/post");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.get("/", protect, getPosts);
router.post("/", protect, createPost);
router.post("/uploadimg", protect, upload);

module.exports = router;
