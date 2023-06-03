const express = require('express');
const cors = require('cors');
const { connection } = require('./configs/db');
require('dotenv').config();

const app =express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Welcome to the foodApp backend! 🪄");
});


app.listen(process.env.port, async()=>{
    try{
        await connection;
        console.log("connected with foodApp DB");
    }catch(error){
        console.log(error);
    }
    console.log(`Server is running at port ${process.env.port}`);
})