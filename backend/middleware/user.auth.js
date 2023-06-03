const jwt = require("jsonwebtoken");
require('dotenv').config();

const authentication=(req, res, next)=>{
    const token=req.headers.authorization

    try{
        jwt.verify(token, process.env.secret, function(err, decoded) {
            console.log(decoded) 
            if(decoded){
                req.headers.user = decoded.userExist;
                next();
            }else{
                res.send({"msg":"Please login first"})
            }
          });
    }catch(error){
        res.send({"msg":"Please verify first"})
    }
};


module.exports={
    authentication
}