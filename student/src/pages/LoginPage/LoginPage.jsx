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

    <div className="min-h-screen min-w-screen overflow-hidden main flex items-center justify-center font-mono relative">
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


// import { motion } from "framer-motion";

// const Carousel = () => {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="relative w-full max-w-4xl h-96">
//         {/* Left Image (Blurred and Closer) */}
//         <motion.img
//           src="/path-to-left-image.jpg"
//           alt="Left Ficus"
//           className="absolute left-1/4 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-40 h-60 object-cover rounded-lg opacity-60 blur-md"
//         />

//         {/* Center Image (Main) */}
//         <motion.img
//           src="/path-to-main-image.jpg"
//           alt="Main Ficus"
//           className="absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-60 h-80 object-cover rounded-lg shadow-lg"
//         />

//         {/* Right Image (Blurred and Closer) */}
//         <motion.img
//           src="/path-to-right-image.jpg"
//           alt="Right Ficus"
//           className="absolute right-1/4 top-1/2 transform -translate-y-1/2 translate-x-1/2 w-40 h-60 object-cover rounded-lg opacity-60 blur-md"
//         />
//       </div>
//     </div>
//   );
// };

// export default Carousel;
