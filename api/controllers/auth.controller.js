const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env.local' });

exports.login = (req, res) => {
    const { email, password } = req.body;

    // Corrected jwt.sign method with options object
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.send({ email, password, token });
}

exports.register = (req, res) => {
    const { email, password } = req.body;
    res.send({ email, password });
}

module.exports = exports;
