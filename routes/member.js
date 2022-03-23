const router=require('express').Router();
const express = require('express');
const MemberController=require('../controllers/MemberController');
const middleware = require("../middleware/middleware");


router.post('/register',MemberController.register);
router.post('/login',MemberController.login);
router.put('/:id', MemberController.updateMember);
router.get('/:id',MemberController.getMember);
router.post('/change-password/:id',MemberController.change_password);

module.exports = router;
