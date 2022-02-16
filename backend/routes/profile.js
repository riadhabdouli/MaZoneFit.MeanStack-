const express = require('express');
const member = require('../models/member');
const router = express.Router();

router.get("/:username",(req ,res, next)=> {
  member.findOne({username : req.params.username}).then(memberData => {
    if(memberData){
      res.status(200).json(memberData);
    }else {
      res.status(404).json({message: 'failed to fetch member info !'});
    }
  })
 });

 module.exports = router;