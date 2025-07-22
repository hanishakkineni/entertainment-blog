const express = require("express");
const helper = require("../Helper/Helper");
const multer = require("multer");
const User = require("../Model/UserSchema");
const jwt = require("jsonwebtoken");

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


// get profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const id = req.user?.id
    const user = await User.findOne({ _id: id }).select(
      "-password -__v -age"
    );
    if (user) {
      return res.status(200).send(user);
    }
    res.status(404).send("User Not Found");
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
});

// user avatar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/avatar");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post("/avatar", upload.single("avatar"), async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
      user.avatar = req.file.filename;
      await user.save();
      return res.status(200).send(user);
    }
    res.status(404).send("User Not Found");
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
});

module.exports = router;
