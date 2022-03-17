const { Validator } = require('node-input-validator');
const trainer = require('../models/trainer.model');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const fs=require('fs');



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
		const newTrainer = trainer({
		 first_name:req.body.first_name,
		 last_name:req.body.last_name,
		 email:req.body.email,
		 password:req.body.password 
		});

		let trainerData=await newTrainer.save();
		return res.status(200).send({
			message:'Registration successfull',
			data:trainerData
		});

	}catch(err){

		return res.status(400).send({
			message:err.message,
			data:err
		});
	}

};
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
    let trainerData = await trainer.findOne({ email: req.body.email });
    if (trainerData) {
      //  let trainerData = await trainer.findOne({ email: req.body.email });
      // if(trainerData) {}
      if (bcrypt.compareSync(req.body.password, trainerData.password)) {
        let jwt_secret = process.env.JWT_SECRET || "mysecret";
        let token = jwt.sign(
          {
            data: trainerData,
          },
          jwt_secret,
          { expiresIn: "1h" }
        );
        return res.status(200).send({
          message: "login success !",
          expiresIn: 3600,
          data: trainerData,
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
};
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
exports.getTrainer=(req,res)=>{
        member.find({ _id: req.param('id') }).then((memberData) => {
          if (memberData) {
            res.status(200).json(memberData[0].toObject());
          } else {
            res.status(404).json({ message: "Member not found !" });
          }
        });
};
exports.updateTrainer= (req, res) => {
        const trainerData = new member({
             _id: req.body.id,
             first_name: req.body.first_name,
             last_name: req.body.last_name,
             email: req.body.email,
             password: req.body.password,
             weight: req.body.weight,
              height:  req.body.height
        });
        member.updateOne({_id:req.params.id},trainerData).then(result => {
       if(result.modifiedCount > 0){
         res.status(200).json({ message : "Update successful !"});
         }else {
          res.status(401).json({ message : "not authorized"});
        }
      });
};
exports.current_user=(req,res)=>{
	return res.status(200).send({
		message:'Current user data successfully fetched',
		data:req.user
	});
};
exports.change_password=async(req,res)=>{
	try{
		const v = new Validator(req.body, {
      old_password: "required",
      new_password: "required",
      confirm_password: "required|same:new_password",
    });
		const matched = await v.check();
	
		if (!matched) {
			return res.status(422).send(v.errors);
		}	
		//console.log(req.params.id);
        let current_user = await Member.findOne({ _id: req.params.id }); 
		//console.log(current_user);
		if(bcrypt.compareSync(req.body.old_password,current_user.password)){
			let hashPassword=bcrypt.hashSync(req.body.new_password,10);	
			await Member.updateOne({
				_id:current_user._id
			},{
				password:hashPassword
			});
			let trainerData=await Trainer.findOne({_id:current_user._id})
			let jwt_secret=process.env.JWT_SECRET||'mysecret';
			let token=jwt.sign({
			  data: trainerData
			}, jwt_secret, { expiresIn: '12h' });

			return res.status(200).send({
				message:'Password successfully updated',
				data:trainerData,
				token:token
			});

		}else{
			return res.status(400).send({
				message:'Old password does not matched',
				data:{}
			});
		}

	}catch(err){
		return res.status(400).send({
			message:err.message,
			data:err
		});
	}

};
exports.update_profile=async (req,res)=>{
	try{
		let rules={
			first_name:'required|minLength:2|maxLength:100',
			last_name:'required|minLength:2|maxLength:100',
		};
		if(req.files && req.files.profile_image){
			req.body['profile_image']=req.files.profile_image;
			rules['profile_image']='required|mime:jpg,jpeg,png';
		}
		const v = new Validator(req.body,rules);

		const matched = await v.check();

		if (!matched) {
			return res.status(422).send(v.errors);
		}

		let current_user=req.user;

		if(req.files && req.files.profile_image){
            var image_file= req.files.profile_image;
            var image_file_name=Date.now()+'-profile-image-'+image_file.name;
            var image_path=publicPath+'/uploads/profile_images/'+image_file_name;
            await image_file.mv(image_path);


            if(current_user.profile_image && current_user.profile_image==''){
	            let old_path=publicPath+'/uploads/profile_images/'+current_user.profile_image;
	            if(fs.existsSync(old_path)){
	            	fs.unlinkSync(old_path);
	            }
            }


		}else{
			var image_file_name=current_user.profile_image;
		}

		await Trainer.updateOne({
			_id:current_user._id
		},{
			first_name:req.body.first_name,
			last_name:req.body.last_name,
			profile_image:image_file_name,
			profession:req.body.profession?req.body.profession:''
		});

			let trainerData=await Member.findOne({_id:current_user._id})
			let jwt_secret=process.env.JWT_SECRET||'mysecret';
			let token=jwt.sign({
			  data: trainerData
			}, jwt_secret, { expiresIn: '12h' });

			return res.status(200).send({
				message:'Profile successfully updated',
				data:trainerData,
				token:token
			});


	}catch(err){
		return res.status(400).send({
			message:err.message,
			data:err
		});
	}

};



