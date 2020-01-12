const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Joi = require("joi");
const { User } = require("../models/user");
// const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ msg: "Invalid Credentials" });
    const payload = {
      _id: user._id
    };
    const token = user.generateAuthToken();
    // const token = jwt.sign(payload, config.get("jwtPrivateKey"));
    res.send(token);

    // jwt.sign(
    //   payload,
    //   config.get("jwtSecret"),
    //   {
    //     expiresIn: 360000
    //   },
    //   (err, token) => {
    //     if (err) throw err;
    //     // return token
    //     res.json({ token });
    //   }
    // );
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

const validate = req => {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .max(255)
      .required()
  };
  return Joi.validate(req, schema);
};
module.exports = router;
