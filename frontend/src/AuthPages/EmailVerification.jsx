import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const EmailVerification = () => {
    const [code,setCode]=useState(["","","","","",""])
    const inputRefs =useRef([]);
    const navigate =useNavigate();
    
    const {error,isLoading,verifyEmail} =useAuthStore();
    const handleChange=(index,value)=>{
        const newCode=[...code];
        //handle pasted content
        if(value.length >1){
            const pastedCode=value.slice(0,6).split("");
            for(let i=0;i<6;i++){
                newCode[i]=pastedCode[i] || "";
            }
            setCode(newCode);
            const lastFilledIndex =newCode.findLastIndex((digit)=> digit !=="");
            const focusIndex =lastFilledIndex<5 ? lastFilledIndex+1:5;
            inputRefs.current[focusIndex].focus();
        }else{
          newCode[index]=value;
          setCode(newCode);
          if(value && index<5){
            inputRefs.current[index +1].focus();
          }  
        }
    };

    const handleKeyDown=(index,e)=>{
        if(e.key === "Backspace" && !code[index]&& index >0){
            inputRefs.current[index -1].focus();
        }
    };
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const verificationCode=code.join("");
        try{
          await verifyEmail(verificationCode);
          navigate("/"); 
          toast.success("Email verified successfully");
        }catch(error){
          console.log(error);
        }
    }
    //auto submit when all fields are filled
    useEffect(()=>{
        if(code.every(digit => digit !="")){
            handleSubmit(new Event('submit'));
            const verificationCode=code.join("");
            console.log(`Verification code submitted: ${verificationCode}`);
        }
    },[code])
  return (
    <div className="flex min-h-full w-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border border-gray-300 shadow-lg rounded-lg p-8 bg-white">
        <h2 className="text-center text-2xl font-bold leading-9 text-black mb-2">
           Verify Your Email
          </h2>
          <p className='text-center text-gray-700 mb-6'>Enter the 6-digit code sent to your email address.</p>
          <form onSubmit={handleSubmit}
          className='space-y-6'>
            <div className='flex justify-between'>
            {code.map((digit, index) => (
							<input
								key={index}
								ref={(el) => (inputRefs.current[index] = el)}
								type='text'
								maxLength='6'
								value={digit}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
								className='w-12 h-12 text-center text-2xl font-bold bg-white text-black border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none'
							/>
						))}
            </div>
            {error && <p className='text-red-600 font-semibold mt-2'>{error}</p>}
            <motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						type='submit'
						disabled={isLoading || code.some((digit) => !digit)}
						className='w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50'
					>
						{isLoading ? <Loader className="animate-spin mx-auto" size={24}/> : "Verify Email"}
					</motion.button>
          </form>
    </div>
    </div>      
    </div>    
  )
}

export default EmailVerification
