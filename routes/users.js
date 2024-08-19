const express = require("express");
const router = express.Router();
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// post - /api/users/register

router.post(`/register`, async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("The email is already registered");
  } else {
    user = new User({
      email: req.body.email,
      passwordHash: await bcrypt.hash(req.body.password, 10),
    });
    await user.save();
    res.status(201).send(user);
  }
});

// post - /api/users/login

router.post(`/login`, async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("User not found");
  }

  if (user && (await bcrypt.compare(req.body.password, user.passwordHash))) {
    let token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ user: user.email, userId: user.id, token: token });
  } else {
    res.status(400).send("Invalid password");
  }
});

// get /api/users

router.get("/", async (req, res) => {
  let users = await User.find();
  res.send(users);
});

module.exports = router;
// make sure you export the routes before running the server
// test..