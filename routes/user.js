const router = require("express").Router();
const express = require("express");
const UserController = require("../controllers/UserController");


router.get('/user-list',UserController.getAllTrainer);


module.exports = router;
