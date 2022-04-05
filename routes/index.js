const MemberRouter=require('./member');
const TrainerRouter=require('./trainer');


module.exports=(app)=>{
	app.get('/',function(req,res){
		res.send({
			'message':'Our first endpoint'
		});
	});

	app.use('/auth',MemberRouter);
	app.use('/profile',MemberRouter);

	app.use('/auth/trainer',TrainerRouter);
	app.use('/trainer',TrainerRouter);
}