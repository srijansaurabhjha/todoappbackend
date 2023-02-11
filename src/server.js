const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
require('dotenv').config()

require('../src/db/conn')


const User=require('../src/model/User')

const app=express();

const port=process.env.BASE_URL||process.env.PORT;

app.use(cors());

app.use(express.json());

//getting all the tasks of a tasklist of a user
app.get("/tasks/:name",async(req,res)=>{
    try{
        const name=req.params.name;
        const foundUser=await User.findOne({name:name});
        res.json(foundUser.tasks);
    }catch(err){
        console.log(err);
    }
})


//Adding task with corresponding user
app.post("/tasks",async(req,res)=>{
    try{
        const {name,task}=req.body;
        const foundUser=await User.findOne({name:name});
        console.log(foundUser)
        
        if(foundUser){
            
            if(task==="")return;
            await User.findOneAndUpdate({
                name:name
            },{
                $addToSet:{
                    tasks:task,
                }
            })
        }else{
            
            let newUser;
            if(task!==""){
                newUser=new User({
                    name:name,
                    tasks:[task]
                })
            }else{
                newUser=new User({
                    name:name,              
                })
            }
            newUser.save().then(()=>{
                console.log("Inserted Successfully");
            }).catch((err)=>{
                console.log(`Error is ${err}`)
            });
        }
        res.send("Posted");
    }catch(err){
       console.log(err);
    }

})

//deleting a task from task list
app.patch("/tasks",async(req,res)=>{
    try{
        const {name,task}=req.body;

        await User.findOneAndUpdate({
            name:name,
        },{
            $pull:{
                tasks:task,
            }
        })
        res.send("Task deleted")
    }catch(err){
        console.log(err);
    }
})

app.listen(port,()=>{
    console.log(`Server is running at port number ${port}`);
})