const express=require('express');
const app=express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false,limit :'50mb' }));
// parse application/json
app.use(bodyParser.json());

const fileUpload = require('express-fileupload');
app.use(fileUpload());

require('dotenv').config();
const cors = require('cors');
app.use(cors());
global.publicPath=__dirname+'/public';

app.use(function(req, res, next){
	global.req=req;
	next();
});

app.use(express.static(__dirname + '/public'));

const mongoose = require('mongoose');
/* mongoose.connect('mongodb://localhost:27017/MeanStackDB', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
	console.log('mongodb connected successfully');
}).catch((err)=>{
	console.log(err);
}); */
mongoose
  .connect(
    "mongodb+srv://yesser:U38IdpYf0n6Stbno@cluster0.c00dc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database !");
  })
  .catch(() => {
    console.log("Connection failed !");
  });


require('./middleware/extend-node-input-validator')
require('./routes/index')(app);

const http=require('http');
const server=http.Server(app);
const port=process.env.PORT|| 3000;
server.listen(port,()=>{
	console.log(`server is running on port localhost:${port}`);
});



