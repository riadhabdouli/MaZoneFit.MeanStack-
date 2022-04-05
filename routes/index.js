const MemberRouter=require('./member');
const TrainerRouter=require('./trainer');
const plansRouter = require('./plans')


module.exports=(app)=>{
	app.get('/',function(req,res){
		res.send({
			'message':'Our first endpoint'
		});
	});

	app.use('/auth',MemberRouter);
	app.use('/profile',MemberRouter);

	app.use('/auth/trainer',TrainerRouter);
	app.use('/profile/trainer',TrainerRouter);

	app.use('/plan',plansRouter);
}