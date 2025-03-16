import Header from "./Header";
import {AnimatePresence, motion} from 'framer-motion'
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import OtpVerifyButton from "./otpVerifyButton"
import { useState } from "react";


function LoginBox({setLoginData , loginData , forgotPassword  , setForgotPassword , OTPdiv , setOTPdiv , otpVal , setOtpVal , disable , setDisable}){

  const nav = useNavigate()
  let arr = ["#ddf3ef" , "#2bbdaa"]
  const [otpdis,setOtpdis] = useState(false)

    return (
        <>
            <motion.div 
        className=" p-8 rounded-[30px] shadow-lg mx-10 max-w-md w-full border-2 border-[#3b3b3b] bg-[#1c1b1b] relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
              
              
                {/* <motion.div className='absolute transform top-0 right-0 translate-x-0 -translate-y-[70px]'>
                <img src="/download__5_-removebg-preview.png" alt="" className='w-[120px]'/>
                </motion.div> */}


        <div className="text-center mb-8 mx-0 px-0">
            <Header 
            data1={"Welcome Back"}
            data2={"Please Login to access your account"}/>
        </div>

       <Input 
       setLoginData={setLoginData}
       loginData={loginData}
       forgotPassword={forgotPassword}
       setForgotPassword={setForgotPassword}
       setOTPdiv={setOTPdiv}
       disable={disable}
       setDisable={setDisable}/> 

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
                onChange={(e)=>{setOtpVal(e.target.value);console.log(otpVal)}}
                disabled={otpdis}
                type="text"
                placeholder="Enter OTP"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000015] bg-transparent font-mono"
              />
              <div className="mt-3">
                  <OtpVerifyButton 
                  otp={otpVal}
                  rno={loginData.rno}
                  disable={disable}
                  setDisable={setDisable}
                  otpdis = {otpdis}
                  setOtpdis = {setOtpdis}/>
              </div>
              
            </motion.div>

          )}
        </AnimatePresence>

        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-[#ddf3ef]">
            Don't have an account?{" "}
            <button
              onClick={() => nav("/signup")}
              className="text-[#ddf3ef]  font-bold basic-1  hover:text-[#2bbdaa] transition-colors"
            >
              Sign Up
            </button>
          </p>
        </motion.div>
      </motion.div>
        </>
    )
}

export default LoginBox;