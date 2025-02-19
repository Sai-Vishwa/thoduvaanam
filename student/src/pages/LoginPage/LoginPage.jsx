import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoginBox from '../../components/LoginPageComponents/LoginBox';



const LoginPage = () => {

  const nav = useNavigate();

  const [loading , setLoading] = useState(false)
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

  

  

  

  return (

    <div className="min-h-screen min-w-screen overflow-hidden bg-white flex items-center justify-center font-mono relative">
      {/* loading animation */}
      <LoginBox 
      loading={loading}
      setLoading={setLoading}
      loginData={loginData}
      loginError={loginError}
      forgotPassword={forgotPassword}
      setForgotPassword={setForgotPassword}
      setLoginData={setLoginData}
      setLoginError={setLoginError}
      OTPdiv={OTPdiv}
      setOTPdiv={setOTPdiv}
      />
    </div>
  );
};

export default LoginPage;