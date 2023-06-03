const express = require("express");
require("dotenv").config();

const userRouter = express.Router();

//Register new user
userRouter.post("/users/register", (req, res)=>{
    const {name, email, password, address} = req.body;

    
});


//login existing user
userRouter.post("/users/login", (req, res)=>{
    
});


module.exports={
    userRouter
}