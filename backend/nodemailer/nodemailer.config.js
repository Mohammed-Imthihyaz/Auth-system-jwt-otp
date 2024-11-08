import dotenv from "dotenv";
dotenv.config();
import nodemailer from 'nodemailer';


// 2. Configure email and send it.

const password=process.env.NODEMAILER_PASS;
const user=process.env.PORT;

console.log("NODEMAILER_PASS:", password+" i "+user);

 export const sendMail=async function sendMail(mailOptions){

   
// 1. Create an email transporter.
// SMTP (Simple Mail Transfer Protocol)

 const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.NODEMAILER_USER,
        pass:process.env.NODEMAILER_PASS
    }
});
// 2. Send the email
try{
    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
}catch(err){
    console.log('Email send failed with error: '+ err);
}
}
