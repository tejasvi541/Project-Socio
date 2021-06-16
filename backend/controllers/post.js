const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");

const axios = require("axios");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");

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
