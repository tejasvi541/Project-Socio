const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");

const axios = require("axios");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");
const ObjectId = require("mongoose").Types.ObjectId;

//==================================== Create Post Route =========================//
// @route       POST api/posts
// @desc        Create a Posts
// @access      Private

exports.createPost = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return next(
      new ErrorResponse(`No User found with ID : ${req.user.id}`, 404)
    );
  }
  if (!req.file) {
    return next(new ErrorResponse(`No Photo Found`, 404));
  }

  let img = fs.readFileSync(req.file.path);

  // Creating post fields
  const newPost = new Post({
    photo: {
      data: img,
      contentType: req.file.mimetype.split("/")[1],
    },
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user.id,
  });

  const post = await newPost.save();

  res.status(200).json({
    success: true,
    data: post,
  });
});

//==================================== GET All Posts Route =========================//
// @route       GET api/posts
// @desc        Get all Posts
// @access      Private

exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().sort({ date: -1 });

  if (!posts) {
    return next(new ErrorResponse(`No Posts found `, 404));
  }

  res.status(200).json({
    success: true,
    data: posts,
  });
});

//==================================== GET Post by id Route =========================//
// @route       GET api/posts/:id
// @desc        Get Post by id
// @access      Private

exports.getPostById = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`No post Found with id : ${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    data: post,
  });
});

//==================================== GET Post by user_id Route =========================//
// @route       GET api/posts/user/:user_id
// @desc        Get User Post by id
// @access      Private

exports.getUserPostsById = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({ user: req.params.user_id });

  if (!result) {
    return next(
      new ErrorResponse(
        `No post Found with user_id : ${req.params.user_id}`,
        404
      )
    );
  }
  res.status(200).json({
    success: true,
    data: posts,
  });
});

//==================================== Delete Post by id Route =========================//
// @route       DELETE api/posts/:id
// @desc        Delete Post by id
// @access      Private

exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new ErrorResponse("Post not found", 404));
  }

  //Check user
  if (post.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: "User not Authorized" });
  }
  await post.remove();

  res.json({ msg: "Post Removed" });
});

//==================================== Like Post by id Route =========================//
// @route       PUT api/posts/like/:id
// @desc        Like a Post
// @access      Private
exports.likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  // Check if the post has already been liked
  if (post.likes.some((like) => like.user.toString() === req.user.id)) {
    return next(new ErrorResponse("Post Already Liked"), 400);
  }
  post.likes.unshift({ user: req.user.id });

  await post.save();

  return res.status(200).json({
    success: true,
    data: post.likes,
  });
});

//==================================== Unlike Post by id Route =========================//

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
exports.unLikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  // Check if the post has not yet been liked
  if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
    return next(new ErrorResponse("Post Hasn't been Liked Yet"), 400);
  }

  // remove the like
  post.likes = post.likes.filter(({ user }) => user.toString() !== req.user.id);

  await post.save();

  return res.status(200).json({
    success: true,
    data: post.likes,
  });
});
