const express = require("express");
const app = express();
const http = require("http").Server(app);   // to load the library we have run port number using hhtp module 
const io = require("socket.io")(http);
const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/ilpdb";    

//Mongoose middleware
mongoose.Promise = global.Promise;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection

//create mongoose Schema
let ChatSchema = mongoose.Schema({
    user:String,
    message:String
});

//create mongoose Model, linking Chat collection with the schema
let ChatModel = mongoose.model("Chat",ChatSchema);

//Router middleware
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});

io.on("connection",(socket)=> {
    
    socket.on("chat", packet => {
        let { name, msg } = packet;

        const chat = new ChatModel({
            user: name,
            message: msg
        });

         //insert to Courses collection
        chat.save((err,result)=> {
            if(!err){
                console.log("Success")
            }else {
                return res.status(400).json({ msg: 'Please fill all fields' });
            }
        })

    })
});

http.listen(9090,()=>console.log("running on port 9090"));