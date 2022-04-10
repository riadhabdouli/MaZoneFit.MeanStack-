const router = require("express").Router();
const express = require("express");
const plansController =  require('../controllers/plans.controller');


router.post('/nutrition',plansController.editNPlan);
router.get('/nutrition/:id',plansController.getNPlan);


router.get('/workout/:id',plansController.getWPlan);
module.exports = router;