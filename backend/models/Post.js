const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },

  text: {
    type: String,
    required: true,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    },
  ],

  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },

      text: {
        type: String,
        required: true,
      },

      gif: {
        data: Buffer,
        contentType: String,
      },

      name: {
        type: String,
      },

      avatar: {
        type: String,
        data: Buffer,
      },

      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", PostSchema);
