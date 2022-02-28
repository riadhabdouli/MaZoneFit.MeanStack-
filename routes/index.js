const authRoute=require('./trainer');
const profileRoute=require('./profile');

module.exports=(app)=>{
	app.get('/',function(req,res){
		res.send({
			'message':'Our first endpoint'
		});
	});

	app.use('/auth',authRoute);
	app.use('/profile',profileRoute);
}