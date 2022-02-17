const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require ("mongoose");
const app = express();

const memberRoutes = require("./routes/profile");
const trainerRoutes = require("./routes/trainer");



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
app.use("/api" , trainerRoutes);

module.exports =app;
