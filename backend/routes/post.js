const express = require("express");
const {
  getPosts,
  createPost,
  getPostById,
  deletePost,
  getPostByUserId,
} = require("../controllers/post");
const store = require("../middleware/multer");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.get("/", protect, getPosts);
router.get("/:id", protect, getPostById);
router.get("/user/:user_id", protect, getPostByUserId);
router.delete("/:id", protect, deletePost);
router.post("/", protect, store.single("photo"), createPost);

module.exports = router;
