import { motion } from "framer-motion";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/input";
import { useAuthStore } from "../../store/authStore";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, forgetpassword } = useAuthStore();
  const handlesSubmit = async (e) => {
    e.preventDefault();
    await forgetpassword(email);
    setIsSubmitted(true);
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="border border-gray-300 shadow-lg rounded-lg p-8 bg-white">
          <h2 className="text-center text-2xl font-bold leading-9 text-black">
            Forget password
          </h2>
          {!isSubmitted ? (
            <form onSubmit={handlesSubmit} className="space-y-6 mt-6">
              <p className="text-black mb-6 text-center">
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
              <Input
                icon={Mail}
                label="Email Address"
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <motion.button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {!isLoading ? (
                  "Send Reset Link"
                ) : (
                  <Loader className="size-6 animate-spin mx-auto" />
                )}
              </motion.button>
            </form>
          ) : (
            <p className="text-black mb-6 text-center">
              if account exisits for {email}, you will receive a password reset
              link shortly
            </p>
          )}

          <p className="mt-10 text-center text-sm text-gray-500">
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 items-center flex justify-center"
            >
              <ArrowLeft className="h-4 mr-2" />
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
