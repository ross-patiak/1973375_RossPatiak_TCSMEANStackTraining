const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;      // creating reference. 

//create mongoose Schema
let CourseSchema = mongoose.Schema({
    _id:Number,
    cname:String,
    desc:String,
    amount:Number
});

//create mongoose Model, linking Courses collection with the schema
let CourseModel = mongoose.model("Courses",CourseSchema);

//add course
router.post("/add",(req,res)=>{
    //must parse int since req returns strings
    const course = new CourseModel({
        _id:parseInt(req.body.cid),
        cname:req.body.cname,
        desc:req.body.desc,
        amount:parseInt(req.body.amount)
    });

    //insert to Courses collection
    course.save((err,result)=> {
        if(!err){
            res.json({...req.body, "msg":"Record stored successfully"})
        }else {
           res.status(400).json({ msg: 'Please fill all fields' });
        }
    })
})

//update course; similar to add
router.post('/update/:id', (req, res) => {
    const cid = parseInt(req.body.cid);
    const newAmount = parseInt(req.body.amount);

    CourseModel.updateMany({_id:cid},{$set:{amount:newAmount}},(err,result)=> {
        if(!err){
            if(result.nModified>0){
                res.json({...req.body, "msg":"Record stored successfully"})
            }else {
                res.status(400).json({...req.body, msg: 'Record not available' });
            }
        }else {
            res.send("Error generated "+err);
        }
    })
  });

//delete course; similar to update
router.post('/delete/:id', (req, res) => {
    const cid = parseInt(req.body.cid);
    CourseModel.deleteOne({_id:cid},(err,result)=> {
        if(!err){
                if(result.deletedCount>0){
                    res.json({"msg":`Course ID: ${cid} deleted successfully`});
                }else {
                    res.status(400).json({...req.body, msg: 'Record not available' });
                }
        }else {
            res.send("Error generated "+err);
        }
    })
  });

  router.get("/list",(req,res)=>{

    //lean() allows me to access result as an Object so I can use it to render the table
    CourseModel.find({}).lean().exec((err,result)=> {

        //bad practice but I do not know how to render dynamic html without a web framework or another third-party library
        const style = "'border: 1px solid black; border-collapse: collapse;'";

        let html = 
            
        `<h1>Courses</h1><br></br>
            <table style=${style}>
            <tr style=${style}>
                <th style=${style}>Course Id</th>
                <th style=${style}>Name</th>
                <th style=${style}>Description</th>
                <th style=${style}>Amount</th>
            </tr>
        `;

        if(!err){

            //for each course, generate new table row
            result.forEach(course => {
                const { _id, cname, desc, amount } = course;
                
                const tableEntry = 
                `<tr style=${style}>
                    <td style=${style}>${ _id}</td>
                    <td style=${style}>${ cname }</td>
                    <td style=${style}>${ desc }</td>
                    <td style=${style}>${ amount }</td>
                </tr>`

                html+=tableEntry;
            });

            //end html string
            const endHtml = `</table><br><a href="/index.html">Back to Home</a>`;
            html+=endHtml;

            //render html string
           res.write(html);
        }
    });
});
  
module.exports = router;