import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TextScramble = ({ text }) => {
  const [scrambledText, setScrambledText] = useState('');
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  
  useEffect(() => {
    let frame = 0;
    const animate = () => {
      frame++;
      const scrambled = text
        .split('')
        .map((char, index) => {
          if (frame > index * 3) return char;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      setScrambledText(scrambled);
      
      if (frame < text.length * 3) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [text]);

  return <span>{scrambledText}</span>;
};

const LoginPage = () => {
  const nav = useNavigate();
  const [OTPdiv, setOTPdiv] = useState("hidden");
  const [loginData, setLoginData] = useState({
    rno: "",
    password: ""
  });
  
  const [loginError, setLoginError] = useState({
    rnoError: "",
    passwordError: ""
  });
  
  const [forgotPassword, setForgotPassword] = useState({
    val: "Forgot password?",
    style: "block"
  });

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:4000/login-signup/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.msg) {
        alert("Login successful");
        nav(`/${data.uname}`);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSendOTP = async () => {
    if (!loginData.rno) {
      setLoginError({ ...loginError, rnoError: "Registration number is required" });
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/login-signup/forgot-password", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      const status = await response.json();
      if (status.msg) {
        alert("OTP sent successfully");
        setOTPdiv("block");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleForgotPassword = () => {
    setForgotPassword(prev => ({
      val: prev.style === "block" ? "Remember password?" : "Forgot password?",
      style: prev.style === "block" ? "hidden" : "block"
    }));
    setLoginError({ ...loginError, passwordError: "" });
  };

  return (
    <div className="min-h-screen min-w-screen overflow-hidden bg-white flex items-center justify-center font-mono">
      
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-lg mx-10 max-w-md w-full border-2 border-[#000015] border-t-[6px] relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div className='absolute transform top-0 right-0 translate-x-0 -translate-y-[70px]'>
          <img src="/download__5_-removebg-preview.png" alt="" className='w-[120px]'/>
        </motion.div>
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl font-bold text-[#000015]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <TextScramble text="Welcome Back" />
          </motion.h1>
          <motion.p 
            className="text-gray-600 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Please sign in to continue!
          </motion.p>
        </div>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div>
            <input
              type="text"
              placeholder="Registration Number"
              value={loginData.rno}
              onChange={(e) => setLoginData({ ...loginData, rno: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000015] bg-transparent font-mono"
            />
            {loginError.rnoError && (
              <p className="text-red-500 text-sm mt-1">{loginError.rnoError}</p>
            )}
          </div>

          <AnimatePresence mode="wait">
            {forgotPassword.style === "block" ? (
              <motion.div
                key="password"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="password"
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000015] bg-transparent font-mono"
                />
                {loginError.passwordError && (
                  <p className="text-red-500 text-sm mt-1">{loginError.passwordError}</p>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.button
            layout
            onClick={forgotPassword.style === "block" ? handleLogin : handleSendOTP}
            className="w-full bg-[#000015] text-white py-2 rounded-lg hover:bg-gray-900 transition-colors font-mono"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {forgotPassword.style === "block" ? "Login" : "Send OTP"}
          </motion.button>

          <motion.button
            layout
            onClick={toggleForgotPassword}
            className="w-full text-[#000015] text-sm hover:text-gray-800 font-mono mt-2"
            whileHover={{ scale: 1.02 }}
          >
            {forgotPassword.val}
          </motion.button>
        </motion.div>

        <AnimatePresence>
          {OTPdiv === "block" && (
            <motion.div 
              className="mt-4 p-4 bg-gray-50 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-[#000015] font-mono">Enter OTP sent to your email</p>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000015] bg-transparent font-mono"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => nav("/signup")}
              className="text-[#000015] hover:text-gray-800 font-bold"
            >
              Sign Up
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;