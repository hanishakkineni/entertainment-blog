const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: "./public/images/blogthumbs/default.png",
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
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
  created_at: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

BlogSchema.index({ title: 1 });
BlogSchema.index({ author: 1 });

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;