const router=require('express').Router();
const express = require('express');
const TrainerController=require('../controllers/TrainerController');
const middleware = require("../middleware/middleware");


router.post('/register',TrainerController.register);
router.post('/login',TrainerController.login);
router.put('/:id', TrainerController.updateTrainer);
router.get('/:id',TrainerController.getTrainer);
router.post('/change-password/:id',TrainerController.change_password);

module.exports = router;
