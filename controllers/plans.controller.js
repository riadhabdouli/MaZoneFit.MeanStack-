const { Validator } = require("node-input-validator");
const member = require("../models/member.model");
const trainer = require("../models/trainer.model");
const nPlan = require("../models/nutrition.model");
const wPlan = require("../models/workout.model");
const express = require("express");
const router = express.Router();


exports.editNPlan= async (req, res) => {
      const newNplan = new nPlan({
        memberId: req.body.a,
        Monday: ["Breakfast","Lunch","Dinner"],
        Tuesday: ["Breakfast","Lunch","Dinner"],
        Wednesday:["Breakfast","Lunch","Dinner"],
        Thursday:["Breakfast","Lunch","Dinner"],
        Friday: ["Breakfast","Lunch","Dinner"],
        Saturday: ["Breakfast","Lunch","Dinner"],
	    	Sunday: ["Breakfast","Lunch","Dinner"],
      });
	   let NplanData = await newNplan.save();
	   console.log(newNplan);
     return res.status(200).send({
       message: "Nutrtion plan created successfully !",
       data: NplanData
     });
}

exports.getNPlan = (req,res)=> {
    nPlan.find({ memberId: req.param("id")}).then((nData) => {
      if (nData) {
        res.status(200).json(nData[0].toObject());
      } else {
        res.status(404).json({ message: "Plan not found !" });
      }
    });
  }

  exports.getWPlan = (req,res)=> {
    wPlan.find({ memberId: req.param("id")}).then((wData) => {
      if (wData) {
        res.status(200).json(wData[0].toObject());
      } else {
        res.status(404).json({ message: "Plan not found !" });
      }
    });
  }
