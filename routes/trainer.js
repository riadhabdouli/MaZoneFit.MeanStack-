const router=require('express').Router();
const express = require('express');
const authController=require('./../controllers/auth.controller');



router.post('/register',authController.register);
router.post('/login',authController.login);
router.put("/profile/:id", authController.updateMember);
router.get("/profile/:email",authController.getMember);


module.exports = router;
