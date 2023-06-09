const express = require('express');
const cors = require('cors');
const { connection } = require('./configs/db');
const { userRouter } = require('./routes/user.route');
const { authentication } = require('./middleware/user.auth');
const { restaurantRouter } = require('./routes/restaurant.route');

require('dotenv').config();

//Creating app
const app =express();

//To get access of multiple domaine
app.use(cors());

//Parsing configuration
app.use(express.json());

//Default routes
app.get("/", (req, res)=>{
    res.send("Welcome to the foodApp backend! 🪄");
});


//user routes
app.use("/api", userRouter);

//user authentication
app.use(authentication);

//restaurant routes
app.use("/api", restaurantRouter);

//Server
app.listen(process.env.PORT, async()=>{
    try{
        await connection;
        console.log("connected with foodApp DB");
    }catch(error){
        console.log(error);
    }
    console.log(`Server is running at PORT ${process.env.PORT}`);
})