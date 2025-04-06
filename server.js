//Imoprting all required external modules

const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const User=require('./models/User')
const bcrypt=require('bcryptjs')

const app=express()
const PORT=3000
app.use(express.json());

//Connecting to DB Atlas
mongoose.connect(
    "mongodb+srv://anagha01:anagha01@recipetcluster.gkbhwae.mongodb.net/rec_db?retryWrites=true&w=majority&appName=recipetcluster",
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(
    console.log("DB connected successfully....")
).catch(
    (err)=>console.log(err)
)

//API landing page http://localhost:3000/
app.get('/',async(req,res)=>{
    try{
        res.send("<h2 style='color:blue;text-align:center'>Welcome to the MERN Stack | Week 2 | Backend</h2>")
    }
    catch(err)
    {
        console.log(err)
    }
})

//API Registration Page http://localhost:3000/register
app.post('/register',async(req,res)=>{
    const {username,email,password}=req.body
    try{
        const hashPassword=await bcrypt.hash(password,10)
        const newUser=new User({username,email,password:hashPassword})
        await newUser.save()
        res.json({message: "User Registered.."})
        console.log("New user is created....")
    }
    catch(err)
    {
        console.log(err)
    }
})

//API Login http://localhost:3000/login
app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) 
            {
             return res.status(400).json({ message: "Invalid Credentials" });
            }
          res.json({ message: "Login Successful", username: user.username });

    }
    catch(err)
    {
        console.log(err)
    }
})

//Server connection and testing
app.listen(PORT,(err)=>{
    if(err)
    {
        console.log(err)
    }
    console.log("Server is running on port :"+PORT)
})