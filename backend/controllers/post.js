const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const axios = require("axios");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const Jimp = require("jimp");
const path = require("path");
// const uuidv4 = require("uuid/dist/");
const multer = require("multer");
const fs = require("fs");

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed"));
  }
}

function arrayRemove(array, value) {
  return array.filter((item) => {
    return item._id.toString() !== value.toString();
  });
}

const storage = multer.diskStorage({
  //multers disk storage settings
  destination: (req, file, cb) => {
    cb(null, "./public/images/post-images/");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];

    cb(null, uuidv4() + "." + ext);
  },
});

const upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 10485760, //10 MB
  },
}).single("photo");

//==================================== upload Photo Route =========================//
// @route
// @desc
// @access      Private
exports.upload = asyncHandler(async (req, res, next) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });

    if (!req.file) return next(new ErrorResponse(`Please Add a Photo `, 400));

    req.body.photo = req.file.filename;
    Jimp.read(req.file.path, function (err, test) {
      if (err) throw err;
      test
        .scaleToFit(480, Jimp.AUTO, Jimp.RESIZE_BEZIER)
        .quality(50)
        .write("./public/images/post-images/thumbnail/" + req.body.photo);
    });
  });
});

//==================================== Create Post Route =========================//
// @route       POST api/posts
// @desc        Create a Posts
// @access      Private

exports.createPost = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("-password");
  // Creating post fields
  const newPost = new Post({
    text: req.body.text,
    name: user.name,
    avatar: user.avatar,
    user: req.user.id,
  });

  if (!user) {
    return next(
      new ErrorResponse(`No User found with ID : ${req.user.id}`, 404)
    );
  }

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
