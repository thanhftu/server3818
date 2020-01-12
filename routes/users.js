const { User, validate } = require("../models/user");
const auth = require("../middleware/auth");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("user with this email is existed...");
    user = new User({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    const token = user.generateAuthToken();
    // token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));
    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["id", "name", "email"]));
  } catch (error) {
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
