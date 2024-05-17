const express = require('express')
const Project = require("../models/project.model");

exports.getAllProjects = async (req, res) => {
    Project.find({}, (err, projects) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).send(projects);
    }
    );
}

module.exports = exports;