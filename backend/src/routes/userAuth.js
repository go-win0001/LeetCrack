const express = require('express');

const authRouter =  express.Router();
const {register, login,logout, adminRegister,deleteProfile} = require('../controllers/userAuthent')
const userMiddleware = require("../middleware/userMiddleware");
const adminMiddleware = require('../middleware/adminMiddleware');

// Register
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', userMiddleware, logout);
authRouter.post('/admin/register', adminMiddleware ,adminRegister); //here na only an admin can register other guy as admin , midleware is to check is he a admin ,and othre will add info jo ki admin laraha hai usek as admin 
authRouter.delete('/deleteProfile',userMiddleware,deleteProfile);
authRouter.get('/check',userMiddleware,(req,res)=>{

    const reply = {
        firstName: req.result.firstName,
        emailId: req.result.emailId,
        _id:req.result._id,
        role:req.result.role,
    }

    res.status(200).json({
        user:reply,
        message:"Valid User"
    });
})
// authRouter.get('/getProfile',getProfile);


module.exports = authRouter;

// login
// logout
// GetProfile

