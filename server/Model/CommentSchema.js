const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  author: {
    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "./public/images/avatar/default.png",
    },
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;