const router = require("express").Router();
const express = require("express");
const plansController =  require('../controllers/plans.controller');


router.post('/nutrition',plansController.createNPlan);

module.exports = router;