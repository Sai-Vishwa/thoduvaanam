import { useEffect, useState } from "react";
import Login from "../../components/LoginSignup/LoginDiv";
import Signup from "../../components/LoginSignup/SignupDiv";
import SubmitButton from "../../components/LoginSignup/SubmitButton"
import './index.css'

function LoginAndSignUpPage(){
    const [login,setLogin] = useState("block");
    const [signup, setSignup] = useState("hidden");
    const [loginStyle,setLoginStyle] = useState("t");
    const [OTP,setOTP] = useState("hidden");
    const [signupData , setSignupData] = useState({
        "name":"",
        "uname" : "",
        "rno":"",
        "leetCodeName":"",
        "leetCodeProfile":"",
        "password":"",
        "verifyPassword":""
    })
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");
    const [unameError , setUnameError] = useState({"val":"username"});
    const [passwordError , setPasswordError] = useState({});
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
                                setName = {setName}
                                setPassword = {setPassword}
                                forgotpassword={forgotpassword}
                                setForgotPassword={setForgotPassword}
                                setuname={setUnameError}
                                unameError={unameError}
                                passwordError={passwordError}
                                setPasswordError={setPasswordError} />
                                <div className="SubmitBtn">
                                <button type="submit" className={`${SubmitButton}`}> Submit</button>
                                </div>
                                <p className="pt-3 pb-3">Don't have an account ? <span  onClick={()=>{setLogin("hidden");setSignup("bold");}} className={`${loginStyle} w-1/2  p-2 cursor-pointer bg-transparent`}>Sign Up</span></p>
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
                                 <div className="SubmitBtn">
                                <button type="submit" className={`${SubmitButton}`}> Submit</button>
                                </div>
                                <div className="Signin pt-3 pb-2"> <p>Already have an account ? <span  onClick={()=>{setLogin("block");setSignup("hidden");}} className={`${loginStyle} w-1/2 bg-transparent p-2 cursor-pointer pb-3`}>Sign In</span></p></div>
                    </div>
                             
                    </div>
                    
                    

            </div>
            
            <div className={`absolute ${OTP}`}>This is the otp div</div>
        </div>
    )
}
export default LoginAndSignUpPage;