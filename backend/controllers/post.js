const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const axios = require("axios");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

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
