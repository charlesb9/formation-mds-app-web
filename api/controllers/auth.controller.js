const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

dotenv.config({ path: __dirname + "/../../.env.local" });

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user._id, roles: user.roles },
      "your_jwt_secret"
    );
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.register = async (req, res) => {

  try {
    const { email, password, firstName, lastName } = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      roles: ["user"],
    });

    console.log("obj user",user);
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = exports;
