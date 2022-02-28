const { Validator } = require('node-input-validator');

const member = require('./../models/member.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const express = require("express");
const router = express.Router();

exports.register=async (req,res)=>{
	const v = new Validator(req.body, {
		first_name:'required|minLength:2|maxLength:100',
		last_name:'required|minLength:2|maxLength:100',
		email: 'required|email|unique:Member,email',
		password: 'required'
	});
	const matched = await v.check();
	if (!matched) {
		return res.status(422).send(v.errors);
	}

	try {
		const newMember = new member({
		 first_name:req.body.first_name,
		 last_name:req.body.last_name,
		 email:req.body.email,
		 password:req.body.password 
		});

		let memberData=await newMember.save();
		return res.status(200).send({
			message:'Registration successfull',
			data:memberData
		});

	}catch(err){

		return res.status(400).send({
			message:err.message,
			data:err
		});
	}

}

exports.login=async (req,res)=>{
  const v = new Validator(req.body, {
    email: "required|email",
    password: "required",
  });

  const matched = await v.check();
  if (!matched) {
    return res.status(422).send(v.errors);
  }

  try {
    let memberData = await member.findOne({ email: req.body.email });
    if (memberData) {
      if (bcrypt.compareSync(req.body.password, memberData.password)) {
        let jwt_secret = process.env.JWT_SECRET || "mysecret";
        let token = jwt.sign(
          {
            data: memberData,
          },
          jwt_secret,
          { expiresIn: "1h" }
        );
        return res.status(200).send({
          message: "login success !",
          expiresIn: 3600,
          data: memberData,
          token: token,
        });
      } else {
        return res.status(400).send({
          message: "Incorrect credentials",
          data: {},
        });
      }
    } else {
      return res.status(400).send({
        message: "Member is not registered",
        data: {},
      });
    }
  } catch (err) {
    return res.status(400).send({
      message: err.message,
      data: err,
    });
  }
}	


exports.check_auth = (req, res, next) => {
     try {
       const token = req.headers.authorization.split(" ")[1];
       const decodedToken = jwt.verify(token, "mysecret");
       req.userData = {
         email: decodedToken.email,
         userId: decodedToken.userId,
       };
       next();
     } catch (error) {
       res.status(401).json({ message: "Auth failed !" });
     }
   };

   exports.getMember=(req,res)=>{
        member.find({ email: req.param('email') }).then((memberData) => {
          if (memberData) {
            res.status(200).json(memberData[0].toObject());
          } else {
            res.status(404).json({ message: "Member not found !" });
          }
        });
   };

   exports.updateMember= (req, res) => {
        const memberData = new member({
             _id: req.body.id,
             first_name: req.body.first_name,
             last_name: req.body.last_name,
             email: req.body.email,
             password: req.body.password,
             weight: req.body.weight,
              height:  req.body.height
        });
        member.updateOne({_id:req.params.id},memberData).then(result => {
       if(result.modifiedCount > 0){
         res.status(200).json({ message : "Update successful !"});
         }else {
          res.status(401).json({ message : "not authorized"});
        }
      });
  }