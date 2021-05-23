const express = require("express");
const Profile = require("../models/Profile");
const User = require("../models/User");
const axios = require("axios");
const asyncHandler = require("../middleware/async");

//==================================== GET Our Profile =========================//
// @route       GET api/profile/me
// @desc        Get current user's profile
// @access      Private

exports.getMyProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({
    user: req.user.id,
  }).populate("user", ["first_name", "last_name", "bio"]);

  res.status(200).json({
    success: true,
    data: profile,
  });
});

//==================================== Create Profile =========================//
// @route       POST api/profile
// @desc        Create or Update User Profile
// @access      Private

exports.createProfile = asyncHandler(async (req, res) => {
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
    res.status(500).send("Add Skills");
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

  if (profile) {
    //update
    profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true }
    );
    return res.json(profile);
  }
  // Create
  profile = new Profile(profileFields);

  await profile.save();

  res.status(200).json({
    success: true,
    data: profile,
  });
});
