
import bcryptjs from "bcryptjs";
import crypto from "crypto";

import { User } from "../models/user.model.js";
import { sendResetSuccessEmail, sendRestEmail, sendVerificationEmail } from "../nodemailer/emails.js";
import { generateTokenAndSetCookie } from "./utils/generateTokenAndSetCookie.js";

export const signup=async(req,res)=>{

    const {email,password,name}=req.body;
   try{
    if(!email || !password || !name){
        throw new Error("All fields are required");
    }
    const userAlreadyExists =await User.findOne({email});
    if(userAlreadyExists){
       
        return res.status(400).json({success:false,message:'User already exists'});
    }
    const hashedPassword =await bcryptjs.hash(password,10);
    const verificationCode =Math.floor(100000+Math.random()*900000).toString();
    const user =new User({
        email,
        password: hashedPassword,
        name,
        verificationToken:verificationCode,
        verificationTokenExpiresAt: Date.now()+24*60*100
   })
   await user.save();
   //jwt
   generateTokenAndSetCookie(res,user.id);

   await sendVerificationEmail(user.email,verificationCode);

   res.status(201).json({
    success: true,
    message: "User created successfully",
    user: {
        ...user._doc,
        password: undefined,
    },
   });

   }catch(error){
    return res.status(400).json({success:false,message:error.message});
   }
}
export const verifyEamil =async (req,res)=>{

    const {code}= req.body;
    try{
        const user =await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt: { $gt:Date.now()}
    })
    if (!user){
        return res.status(400).json({success:false,message:'Invalid or expired verification code'});
    }
    user.isVerified =true;
    user.verificationToken=undefined;
    user.verificationTokenExpiresAt=undefined;
    await user.save();
    res.status(201).json({
        success: true,
        message: "User verified ",
        user: {
            ...user._doc,
            password: undefined,
        },
       });
    }catch(error){
        console.log("error in verifyEmail",error);
        return res.status(400).json({success:false,message:error.message});
    }
}
export const login=async(req,res)=>{
  const {email,password}=req.body;
  try{
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({success:false,message:"Invalid Credentials"});
    }
    const isPasswordValid =await bcryptjs.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({success:false,message:"Incorrect Password"});
    }
    generateTokenAndSetCookie(res,user._id);
    user.lastLogin=new Date();
    await user.save();
    res.status(201).json({
        success: true,
        message: "User verified ",
        user: {
            ...user._doc,
            password: undefined,
        },
       });

  }catch(error){
    return res.status(400).json({success:false,message:error.message});
  }
}
export const logout=async(req,res)=>{
    res.clearCookie("token");
    return res.status(200).json({success:true,message:"Logged out succesfully"});

}

export const forgetpassword=async (req,res)=>{
    const {email} =req.body;
    try{
        const user =await User.findOne({email});
        if(!user){
            return res.status(400).json({success:false,message:"USER NOT FOUND!!"});   
        }
      
        //generate reset token (to to in the url of rest password)
        const resetToken =crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt =Date.now()+1*60*60*1000;//1 hour
        user.resetPasswordToken=resetToken;
        user.resetPasswordExpiresAt=resetTokenExpiresAt;
        await user.save();
        await sendRestEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`);
        res.status(201).json({
            success: true,
            message: "Re-Set Email Sent succesfully",
            user: {
                ...user._doc,
                password: undefined,
            },
           });
    }catch(error){
        console.log("Error in forgetPassword",error);
        res.status(400).json({success:false,message:error.message});
    }
}

export const resetPassword=async(req,res)=>{
    try{
        const{token}=req.params;
        const {password}=req.body;
        const user =await User.findOne({
            resetPasswordToken:token,
            resetPasswordExpiresAt:{$gt: Date.now()},
        });
        if(!user){
            return res.status(400).json({success:false,message:"session expired"});
        }
        const hashedPassword=await bcryptjs.hash(password,10);
        user.password=hashedPassword;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpiresAt=undefined;
        user.save();

        await sendResetSuccessEmail(user.email);
        res.status(201).json({
            success: true,
            message: "Password Re-set succesfully",
            user: {
                ...user._doc,
                password: undefined,
            },
           });

    }catch(error){
        console.log("Error in resetPassword ", error);
		res.status(400).json({ success: false, message: error.message });
    }
}
export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};