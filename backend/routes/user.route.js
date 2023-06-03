const express = require("express");
const { userModel } = require("../models/user.model");
require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const userRouter = express.Router();


//Register new user
userRouter.post("/users/register", async (req, res) => {
    const { name, email, password, address } = req.body;

    try {
        const isAlready = await userModel.find({ email });
        if (isAlready.length > 0) {
            res.status(409).send({ "msg": "user already registered please login first" });
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(400).send({ "msg": "bcrypt password error" });
                } else {
                    if (name == "" || email == "" || password == "") {
                        res.status(400).send({ "msg": "Please fill all credentials" });
                    } else {
                        const user = new userModel({ name, email, password: hash, address });
                        await user.save();
                        res.status(200).send({ "msg": "User registered successful", "status": true });
                    }
                }
            });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Something went wrong", "error": error.message });
    }

});


//login user
userRouter.post("/users/login", async (req, res) => {
    const { name, email, password, address } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(400).send({ "msg": "user don't exist please register first" });
        } else {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    var token = jwt.sign({ userExist: user._id}, process.env.secret, { expiresIn: "3h" });
                    res.status(200).send({ "msg": "user logged in successful", "user": { name: user.name, email: user.email, _id: user._id }, "token": token })

                } else {
                    res.status(400).send({ "msg": "Wrong password or email" })
                }
            });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Something went wrong", "error": error.message });
    }

});


userRouter.patch("/users/:id/reset", async (req, res) => {
    const userId = req.params.id;
    const { password } = req.body;

    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(400).send({ "msg": "bcrypt password error" });
            } else {
                if (password == "") {
                    res.status(400).send({ "msg": "Please provide valid password" });
                } else {
                    const user = await userModel.findByIdAndUpdate(userId,{ password: hash });
                    console.log(user)
                    res.status(200).send({ "msg": "Password updated successfully" });
                }
            }
        });
    } catch (error) {
        res.status(500).send({ "msg": "Something went wrong", "error": error.message });
    }
});


module.exports = {
    userRouter
}