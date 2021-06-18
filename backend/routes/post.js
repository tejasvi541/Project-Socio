const express = require("express");
const {
  getPosts,
  createPost,
  getPostById,
  deletePost,
  getUserPostsById,
  likePost,
  unLikePost,
} = require("../controllers/post");
const store = require("../middleware/multer");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.get("/", protect, getPosts);
router.get("/:id", protect, getPostById);
router.get("/user/:user_id", protect, getUserPostsById);
router.put("/like/:id", protect, likePost);
router.put("/unlike/:id", protect, unLikePost);

router.delete("/:id", protect, deletePost);
router.post("/", protect, store.single("photo"), createPost);

module.exports = router;
