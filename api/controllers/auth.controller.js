//auth controller 
const express = require('express');

exports.login = (req, res) => {
    const { email, password } = req.body;
    res.send(({ email, password }));

}

exports.register = (req, res) => {
    const { email, password } = req.body;
    res.send( email, password);
}

module.exports = exports;