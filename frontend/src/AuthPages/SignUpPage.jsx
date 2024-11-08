import { motion } from "framer-motion";
import { Loader, Lock, Mail, User } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input";
import { useAuthStore } from "../../store/authStore";
import PasswordCriteria from "./PasswordCriteria";

const SignUpPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {signup,error,isLoading} =useAuthStore();
    const navigate=useNavigate();
    const handlesSignUP = async(e) => {
        e.preventDefault();
        try{
            await signup(email,password,name);
            navigate("/verify-email");
        }catch(error){
            console.log(error);
        }
    };

    return (
        <>
       
            <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="border border-gray-300 shadow-lg rounded-lg p-8 bg-white">
                        <h2 className="text-center text-2xl font-bold leading-9  text-black">
                            Create Account 
                        </h2>

                        <form onSubmit={handlesSignUP} className="space-y-6 mt-6">
                            <Input
                                icon={User}
                                label="Name"
                                type="text"
                                placeholder="Full Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input
                                icon={Mail}
                                label="Email Address"
                                type="email"
                                placeholder="Email Address"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                icon={Lock}
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {error && <p className="text-red-600 font-semibold mt-2">{error}</p>}
                            <PasswordCriteria password={password}/>

                            <motion.button
                                    type="submit"
                                     className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                     whileHover={{scale:1.02}}
                                     whileTop={{scale: 0.98}}
                                     disabled={isLoading}
                                     >
                                    {isLoading ? <Loader className="animate-spin mx-auto" size={24}/>:"sign Up"}
                            </motion.button>
                        </form>

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link to={"/login"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUpPage;
