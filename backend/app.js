const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require ("mongoose");
const app = express();

const memberRoutes = require("./routes/profile");
const trainerRoutes = require("./routes/trainer");
mongoose.connect("mongodb+srv://yesser:U38IdpYf0n6Stbno@cluster0.c00dc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
.then(()=> {
  console.log('Connected to database !');
})
.catch(()=>{
  console.log('Connection failed !');
});

app.use(bodyParser.json());

app.use((req,res,next) => {
  res.setHeader('Access-Control-Allow-Origin',"*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods",
  "GET, POST, PATCH, PUT , DELETE, OPTIONS");
  next();
});

app.use("/api/profile",memberRoutes);
app.use("/api/trainer" , trainerRoutes);

module.exports =app;
