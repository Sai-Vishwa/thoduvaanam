import { useEffect, useState } from "react";
import Login from "../../components/LoginSignup/LoginDiv";
import Signup from "../../components/LoginSignup/SignupDiv";
import SubmitButton from "../../components/LoginSignup/SubmitButton"
import './index.css'
import { useNavigate } from "react-router-dom";
import LoginButton from "../../components/LoginSignup/loginButton";
import OtpDiv from "../../components/LoginSignup/otp/OtpDiv";

function LoginPage(){

    const nav = useNavigate();
    const [OTPdiv,setOTPdiv] = useState("hidden");

    const [otpData,setOtpData] = useState("");
    const [otpError,setOtpError] = useState("");
    
    const [loginData,setLoginData] = useState({
      "rno":"",
      "password":""
    })
    
    
    const [loginError,setLoginError] = useState({
      "rnoError":"",
      "passwordError":""
    })
    
    const [forgotpassword,setForgotPassword] = useState({"val":"forgot password?","style":"block"});

    return (
        <div className="Container">
            <div className="BoxContainer">
                <div className="heading">
                  <h1>Welcome</h1>
                  <h1>Back ,</h1>
                  <h3>Please sign-in to continue !</h3>
                </div>
            <div className="login">
                <Login 
                  forgotPassword={forgotpassword}
                  loginData={loginData}
                  loginError={loginError}
                  setForgotPassword={setForgotPassword}
                  setLoginData={setLoginData}
                  setLoginError={setLoginError}
                  setOTPdiv = {setOTPdiv}
                   />
                <LoginButton 
                forgotPassword={forgotpassword}
                loginData={loginData}
                loginError={loginError}
                setLoginError={setLoginError}
                setOtpDiv={setOTPdiv}/>

                <OtpDiv />
                <div className={`${OTPdiv}`}>
                    This is the otp div
                </div>
                <p className="pt-3 pb-3">Don't have an account ? <span  onClick={()=>{nav("/signup")}} className={` w-1/2  p-2 cursor-pointer bg-transparent`}>Sign Up</span></p>
              </div>
          </div>
        </div>
    )
}
export default LoginPage;