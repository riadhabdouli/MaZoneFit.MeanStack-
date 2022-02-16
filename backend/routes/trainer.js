const express = require('express');
const Trainer = require('../models/trainer');
const router = express.Router(); 


const authController = require('./../controllers/auth.controller')
// router.post('/register',authController.register);
router.post('/login',authController.login);


router.post("/trainer/register" ,(req,res,next)=> {
  const url = req.protocol + '://' +req.get("host"); 
  const trainer = new Trainer( {
  first_name : req.body.first_name,
  last_name: req.body.last_name,
  email: req.body.email,
  password: req.body.password
  });
  trainer.save().then(createdTrainer => {
   res.status(201).json({
     message: 'trainer added successfuly',
      post: {
       ... createdTrainer,
       id: createdTrainer._id
     }
   });
  });
}); 

router.get('',(req ,res, next)=> {
   console.log("working !");
});



module.exports = router;