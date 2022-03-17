const router=require('express').Router();
const express = require('express');
const authController=require('../controllers/auth.controller');
const middleware = require("../middleware/middleware");
const profileController = require("../controllers/profile.controller");

router.post('/register',authController.register);
router.post('/login',authController.login);
router.put("/profile/:id", authController.updateMember);
router.get("/profile/:id",authController.getMember);
router.post('/change-password/:id',profileController.change_password);

module.exports = router;
