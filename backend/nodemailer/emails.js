
import { VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";
import { sendMail } from "./nodemailer.config.js";


export const sendVerificationEmail=async (email,verificationToken)=>{
    const mailOptions = {
        from: 'mohammedimthihyaz@gmail.com',
        to: email,
        subject: 'Verify your email',
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
    };
    
    try{
        const response =await sendMail(mailOptions);
        console.log("Email sent successfully",response);
    }catch(error){
        console.error(`Error sending verification`,error);
        throw new Error(`Error sending verification  email: ${error}`);
       
    }

}

export const sendRestEmail=async(email,url)=>{
    const mailOptions = {
        from: 'mohammedimthihyaz@gmail.com',
        to: email,
        subject: 'Verify your email',
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",url)
    };
    try{
        const response =await sendMail(mailOptions);
        console.log("Email sent successfully",response);
    }catch(error){
        console.error(`Error sending verification`,error);
        throw new Error(`Error sending verification  email: ${error}`);
    }
}

export const sendResetSuccessEmail=async (email)=>{
    const mailOptions = {
        from: 'mohammedimthihyaz@gmail.com',
        to: email,
        subject: 'Password Reset Successful',
        html: PASSWORD_RESET_SUCCESS_TEMPLATE
    };
    try{
        const response =await sendMail(mailOptions);
        console.log("Email sent successfully",response);
    }catch(error){
        console.error(`Error sending verification`,error);
        throw new Error(`Error sending verification  email: ${error}`);
    }
}