const router=require('express').Router();
const express = require('express');
const authController=require('./../controllers/auth.controller')
router.post('/register',authController.register);
router.post('/login',authController.login);
module.exports = router;