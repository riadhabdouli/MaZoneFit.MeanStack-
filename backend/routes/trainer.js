const express = require('express');
const member = require('../models/member');
const router = express.Router(); 


const authController = require('./../controllers/auth.controller')
router.post('/register',authController.register);
router.post('/login',authController.login);


router.get('',(req ,res, next)=> {
   console.log("working !");
});



module.exports = router;