const express = require("express");
const Profile = require("../models/Profile");
const Post = require("../models/Post");
const User = require("../models/User");
const axios = require("axios");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

//==================================== GET Our Profile =========================//
// @route       GET api/profile/myprofile
// @desc        Get current user's profile
// @access      Private

exports.getMyProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({
    user: req.user.id,
  }).populate("user", ["first_name", "last_name", "bio"]);

  if (!profile) {
    return next(new ErrorResponse(`No Profile found `, 404));
  }

  res.status(200).json({
    success: true,
    data: profile,
  });
});

//==================================== Create Profile =========================//
// @route       POST api/profile
// @desc        Create or Update User Profile
// @access      Private

exports.createProfile = asyncHandler(async (req, res, next) => {
  const {
    website,
    dob,
    location,
    spacePreference,
    skills,
    bio,
    youtube,
    twitter,
    instagram,
    linkedin,
    github,
  } = req.body;

  // Build Profile Object
  const profileFields = {};
  profileFields.user = req.user.id;
  if (dob) profileFields.dob = dob;
  if (spacePreference) profileFields.website = spacePreference;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (skills) profileFields.skills = skills;

  if (skills.length == 0) {
    return next(new ErrorResponse(`No Skills found `, 404));
  }

  if (skills) {
    profileFields.skills = skills
      .toString()
      .split(",")
      .map((skill) => skill.trim());
  }

  // Build Social object
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (github) profileFields.social.github = github;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;
  if (twitter) profileFields.social.twitter = twitter;

  let profile = await Profile.findOne({ user: req.user.id });

  if (!profile) {
    // Create
    profile = new Profile(profileFields);
    await profile.save();
  }

  if (profile) {
    //update
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    );
    return res.json(profile);
  }

  await profile.save();

  res.status(200).json({
    success: true,
    data: profile,
  });
});

//==================================== Get all profiles =========================//
// @route    GET api/profile
// @desc     Get all profiles
// @access   Public

exports.getProfiles = asyncHandler(async (req, res, next) => {
  const profiles = await Profile.find().populate("user", [
    "first_name",
    "last_name",
    "bio",
  ]);

  if (!profiles) {
    return next(new ErrorResponse(`No Profiles found `, 404));
  }

  res.status(200).json({
    success: true,
    data: profiles,
  });
});

//==================================== Get profile by user ID =========================//
// @route    GET api/profile/:user_id
// @desc     Get profile by user ID
// @access   Public
exports.getProfile = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({
    user: req.params.user_id,
  }).populate("user", ["first_name", "last_name", "bio"]);

  if (!profile)
    return next(
      new ErrorResponse(`No Profile found with id ${req.params.user_id}`, 404)
    );

  res.status(200).json({
    success: true,
    data: profile,
  });
});

//==================================== Add Education Experience =========================//
// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private

exports.addEducation = asyncHandler(async (req, res, next) => {
  const { school, degree, fieldofstudy, from, to, current, description } =
    req.body;

  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  };

  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile)
    return next(new ErrorResponse(`No Profile found with this ID`, 404));

  profile.education.unshift(newEdu);

  await profile.save();
  res.status(200).json({
    success: true,
    data: profile,
  });
});

//==================================== Delete Profile Education =========================//
// @route    DELETE api/profile/education/:edu_id
// @desc     DELETE profile education
// @access   Private

exports.deleteEducation = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });

  if (!profile)
    return next(new ErrorResponse(`No Profile found with this ID`, 404));

  //get the remove index
  const removeIndex = profile.education
    .map((item) => item.id)
    .indexOf(req.params.edu_id);

  if (removeIndex === -1)
    return next(new ErrorResponse(`No Education found with this ID`, 404));

  profile.education.splice(removeIndex, 1);

  await profile.save();
  res.status(200).json({
    success: true,
    data: profile,
  });
});
