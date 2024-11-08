import { motion } from "framer-motion";
import { Lock, Mail } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Input from "../../components/input";
import { useAuthStore } from '../../store/authStore';


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login,isLoading,error}=useAuthStore();
  
  const handlesLogin = async (e)=> {
    e.preventDefault();
    await login(email,password);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border border-gray-300 shadow-lg rounded-lg p-8 bg-white">
          <h2 className="text-center text-2xl font-bold leading-9 text-black">
            Welcome Back 
          </h2>

          <form onSubmit={handlesLogin} className="space-y-6 mt-6">
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-ce
             mb-6">
              <Link to='/forget-password' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 ">
              Frogot Password?
              </Link>
            </div>
            {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}
            <motion.button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Login
            </motion.button>
          </form>
          <p className="mt-10 text-center text-sm text-gray-500">
                            Don&apos;t have an account?{' '}
                            <Link to={"/signup"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign Up
                            </Link>
                        </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
