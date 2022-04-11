const router=require('express').Router();
const express = require('express');
const TrainerController=require('../controllers/TrainerController');
const middleware = require("../middleware/middleware");


router.post('/register',TrainerController.register);
router.post('/login',TrainerController.login);
router.put('/update/:id', TrainerController.updateTrainer);
router.get('/profile/:id',TrainerController.getTrainer);
router.post('/change-password/:id',TrainerController.change_password);
router.put('/addmember/:id', TrainerController.addMember);
router.get('/:id',TrainerController.getTrainer);


module.exports = router;
