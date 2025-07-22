const express = require("express");
const helper = require("../Helper/Helper");
const multer = require("multer");
const Blog = require("../Model/BlogSchema");
const jwt = require("jsonwebtoken");
const User = require("../Model/UserSchema");

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: "Token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Invalid Token" });
  }
};

// get all blogs
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ created_at: -1 });
    res.status(200).send(blogs);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
});

// get blogs by user id
router.get("/blogs/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const blogs = await Blog.find({ "author.username": user.username }).sort({ created_at: -1 });
    res.status(200).send(blogs);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
});

// get blog by id
router.get("/blog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).send(blog);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/blogthumbs");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// create blog
router.post("/blogs", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const thumbnail = req.file ? `/images/blogthumbs/${req.file.originalname}` : null;
    const user = await User.findOne({ _id: req.user.id });
    const author = {
      username: user.username,
      avatar: user.avatar,
    };
    const blog = new Blog({
      title,
      content,
      author,
      category,
    });
    if (thumbnail) {
      blog.thumbnail = thumbnail;
    }
    await blog.save();
    res.status(201).send(blog);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
});

module.exports = router;