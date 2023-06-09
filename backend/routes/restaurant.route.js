const express = require("express");

const restaurantRouter = express.Router();


restaurantRouter.get("/restaurant", (req, res)=>{
    res.send("authentication is working fine");
});

restaurantRouter.post("/restaurant", (req, res)=>{
    res.send("authentication is working fine");
});

restaurantRouter.delete("/restaurant", (req, res)=>{
    res.send("authentication is working fine");
});



module.exports={
    restaurantRouter
}
