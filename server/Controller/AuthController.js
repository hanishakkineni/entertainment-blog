const express = require("express");
const helper = require("../Helper/Helper");
const User = require("../Model/UserSchema");
const jwt = require("jsonwebtoken");

const router = express.Router();


// register
router.post("/register", async (req, res) => {
  try {
    const { username, email, age, password } = req.body;
    const dataExist = await User.findOne({ email: email });
    if (dataExist) {
      return res.status(409).json({ message: "User Already Exist" });
    }
    const hashed_password = await helper.hashPassword(password);
    const newUser = new User({
      username,
      email,
      password: hashed_password,
      age,
    });

    const response = await newUser.save();
    if (response) {
      return res.status(200).json({ message: "User Registered Successfully" });
    }
    res.status(500).send("Internal Server Error");
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const exist = await User.findOne({ email: email });
    if (!exist) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const password_check = await helper.check_password(
      password,
      exist.password
    );
    if (exist && password_check) {
      const token = jwt.sign({id: exist._id}, process.env.SECRET_KEY);
      res.cookie("token", token, { httpOnly: true});
      res.status(200).json({ message: "Login Successful"});
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.clearCookie("username");
  res.status(200).json({ message: "Logout Successful" });
});

module.exports = router;
