const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const url = "mongodb://localhost:27017/ilpdb";

//express comes with its own body parser now
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//create static server for interface
app.use(express.static(path.join(__dirname, 'pages')));

//Mongoose middleware
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection

//Router middleware
app.use('/api/courses', require('./routes/api/courses'));

app.listen(9090,()=>console.log("running on port 9090"));