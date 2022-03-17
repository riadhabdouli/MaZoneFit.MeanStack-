const MemberRouter=require('./member');


module.exports=(app)=>{
	app.get('/',function(req,res){
		res.send({
			'message':'Our first endpoint'
		});
	});

	app.use('/auth',MemberRouter);
	app.use('/profile',MemberRouter);
}