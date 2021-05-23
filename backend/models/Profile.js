const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  website: {
    type: String,
  },
  dob: {
    type: Date,
    required: [true, "Please Enter your Date of Birth"], // Required
  },
  location: {
    type: String,
  },
  spacePreference: {
    type: String,
  },
  skills: {
    type: [String],
    required: [true, "Please Enter your skills"], // Required
  },
  bio: {
    type: String,
  },
  education: [
    {
      school: {
        type: String,
        required: [true, "Please Enter your School/College"],
      },
      degree: {
        type: String,
        required: [true, "Please Enter your Degree"],
      },
      fieldofstudy: {
        type: String,
        required: [true, "Please Enter your Field of Study"],
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    github: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("profile", ProfileSchema);
