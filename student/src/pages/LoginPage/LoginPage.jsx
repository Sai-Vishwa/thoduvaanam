import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LoginBox from '../../components/LoginPageComponents/LoginBox';



const LoginPage = () => {

  const nav = useNavigate();

  const [OTPdiv, setOTPdiv] = useState("hidden");

  const [loginData, setLoginData] = useState({
    rno: "",
    password: ""
  });
 
  const [forgotPassword, setForgotPassword] = useState({
    val: "Forgot password?",
    style: "block"
  });

  const [otpVal , setOtpVal] = useState("");
  
  const [disable , setDisable] = useState(false)
  

  

  return (

    <div className="min-h-screen min-w-screen overflow-hidden bg-[#ff4a5f] flex items-center justify-center font-mono relative">
      <LoginBox 
      loginData={loginData}
      forgotPassword={forgotPassword}
      setForgotPassword={setForgotPassword}
      setLoginData={setLoginData}
      OTPdiv={OTPdiv}
      setOTPdiv={setOTPdiv}
      otpVal={otpVal}
      setOtpVal={setOtpVal}
      disable = {disable}
      setDisable = {setDisable}
      />
    </div>
  );
};

export default LoginPage;