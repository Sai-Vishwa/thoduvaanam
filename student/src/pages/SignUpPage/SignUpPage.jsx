import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import SignUpButton from "../../components/LoginSignup/signupButton";
import OtpDiv from "../../components/LoginSignup/otp/OtpDiv";
import Signup from "../../components/LoginSignup/SignupDiv";

function SignUpPage(){
    useEffect(()=>{
        const handleBeforeUnload = (event) => {
            if (!window.confirm("All your data will be lost.. Sure wanna continue???")) {
              event.preventDefault();
              event.returnValue = "";
            } else {
              fetch("http://localhost:4000/login-signup/force-quit-signup", { method: "POST" });
            }
          };
      
          window.addEventListener("beforeunload", handleBeforeUnload);
          return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    },[])
    const nav = useNavigate();
    const [otpDiv , setOtpDiv] = useState("hidden")
    const [otpData,setOtpData] = useState("");
    const [otpError,setOtpError] = useState("");
    const [signupData , setSignupData] = useState({
            "name":"",
            "uname" : "",
            "rno":"",
            "leetCodeName":"",
            "leetCodeProfile":"",
            "password":"",
            "verifyPassword":"",
            "isVerified":false
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
        return (
        <div className="Container">
            <div className="BoxContainer">
            <div className="heading">
                      <h1 className="font-extrabold text-5xl">Create</h1>
                      <h1 className="font-extrabold text-5xl">Account,</h1>
                      <h3 className="font-bold text-xl">Please sign-up to continue !</h3>
                    </div>
                    <div className="signup">
                        <Signup 
                            signupData={signupData}
                            setSignupData={setSignupData}
                            signUpError={signupError}
                            setSignUpError={setSignupError}
                            />
                        <SignUpButton 
                        setOtpDiv={setOtpDiv}
                        setSignUpError={setSignupError}
                        signUpError={signupError}
                        signUpData={signupData}/>
                        <OtpDiv 
                            otpData={otpData}
                            setOtpData={setOtpData}
                            otpError={otpError}
                            setOtpError={setOtpError}
                            OtpDiv={otpDiv}
                            rno={signupData.rno}
                        />
                        <div className="Signin pt-3 pb-2"> <p>Already have an account ? <span  onClick={()=>{nav("/login")}} className={` w-1/2 bg-transparent p-2 cursor-pointer pb-3`}>Login</span></p></div>
                    </div>
            </div>
        </div>
        
        )
}
export default SignUpPage