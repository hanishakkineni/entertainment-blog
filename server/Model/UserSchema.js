const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  about:{
    type: String,
    default: "Hello, I'm new here!",
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  age: {
    type: Number,
    required: true,
    min: 0,
  },

  avatar: {
    type: String,
    default: "http://localhost:3001/profiles/default.png",
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });
const User = mongoose.model("User", UserSchema);

module.exports = User;
