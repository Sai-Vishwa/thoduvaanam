import { useEffect, useState } from "react";
import Login from "../../components/LoginSignup/LoginDiv";
import Signup from "../../components/LoginSignup/SignupDiv";
import SubmitButton from "../../components/LoginSignup/SubmitButton"
import './index.css'

function LoginAndSignUpPage(){
    const [login,setLogin] = useState("block");
    const [signup, setSignup] = useState("hidden");
    const [OTP,setOTP] = useState("hidden");
    const [OTPVerify , setOTPVerify] = useState(false)
    const [signupData , setSignupData] = useState({
        "name":"",
        "uname" : "",
        "rno":"",
        "leetCodeName":"",
        "leetCodeProfile":"",
        "password":"",
        "verifyPassword":""
    })
    const [loginData,setLoginData] = useState({
      "uname":"",
      "password":""
    })
    const [otpData,setOtpData] = useState({
      "value":""
    })
    const [otpError,setOtpError] = useState({
      "otpError":""
    })
    const [loginError,setLoginError] = useState({
      "unameError":"",
      "passwordError":""
    })
    const [signupError,setSignupError] = useState({
        "nameError":"",
        "unameError" : "",
        "rnoError":"",
        "leetCodeNameError":"",
        "leetCodeProfileError":"",
        "passwordError":"",
        "verifyPasswordError":""
    })
    const [forgotpassword,setForgotPassword] = useState({"val":"forgot password?","style":"block"});

    return (
        <div className="Container">
            <div className="BoxContainer">
                    
              <div className={`${login}`}>
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
                   />
                <SubmitButton />
                <p className="pt-3 pb-3">Don't have an account ? <span  onClick={()=>{setLogin("hidden");setSignup("bold");}} className={` w-1/2  p-2 cursor-pointer bg-transparent`}>Sign Up</span></p>
              </div>
                              
                    </div>
                    <div className={`${signup}`}>
                    <div className="heading">
                      <h1>Create</h1>
                      <h1>Account,</h1>
                      <h3>Please sign-up to continue !</h3>
                    </div>
                    <div className="signup">
                    <Signup 
                                signupData={signupData}
                                setSignupData={setSignupData}/>

                                <SubmitButton />

                                 {/* <div className="SubmitBtn">
                                <button type="submit" className={`${SubmitButton}`}> Submit</button>
                                </div> */}
                                <div className="Signin pt-3 pb-2"> <p>Already have an account ? <span  onClick={()=>{setLogin("block");setSignup("hidden");}} className={` w-1/2 bg-transparent p-2 cursor-pointer pb-3`}>Sign In</span></p></div>
                    </div>
                             
                    </div>
                    
                    

            </div>
            
            <div className={`absolute ${OTP}`}>This is the otp div</div>
        </div>
    )
}
export default LoginAndSignUpPage;