const express = require("express");
const router = express.Router();
const  projetController = require("../controllers/projet.controller");

router.get("/", projetController.getAllProjects);

module.exports = router;