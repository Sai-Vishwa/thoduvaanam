import { useEffect, useState } from "react";
import Login from "../components/LoginSignup/LoginDiv";
import Signup from "../components/LoginSignup/SignupDiv";
import SubmitButton from "../components/LoginSignup/SubmitButton";

function LoginAndSignUpPage(){
    const [login,setLogin] = useState("block");
    const [signup, setSignup] = useState("hidden");
    const [loginStyle,setLoginStyle] = useState("text-blue-950 bg-white");
    const [signupStyle,setSignupStyle] = useState("text-white bg-blue-950");
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
    const [unameError , setUnameError] = useState({"val":"Kaaka katha keturukken","style":"text-blue-950"});
    const [passwordError , setPasswordError] = useState({"val":"Kaathula ola ottirukken","style":"text-blue-950"});
    const [forgotpassword,setForgotPassword] = useState({"val":"forgot password?","style":"block"});

    return (
        <div className="min-h-screen w-screen bg-blue-950 text-white relative flex items-center justify-center text-2xl">
            <div className="mx-auto block w-4/12 border-white border-2 relative p-6 rounded-3xl">
                    <div className="mx-auto w-full border-2 border-white flex items-center mt-4 mb-4">
                            <div  onClick={()=>{setLogin("block");setSignup("hidden");setLoginStyle("text-blue-950 bg-white");setSignupStyle("text-white bg-blue-950")}} className={`${loginStyle} w-1/2 flex justify-center p-2 cursor-pointer`}>login</div>
                            <div  onClick={()=>{setLogin("hidden");setSignup("block");setSignupStyle("text-blue-950 bg-white");setLoginStyle("text-white bg-blue-950")}} className={`${signupStyle} w-1/2 flex justify-center p-2 cursor-pointer`}>signup</div>
                    </div>
                    <div className={`${login} mx-auto w-full my-6`}>
                                <Login 
                                setName = {setName}
                                setPassword = {setPassword}
                                forgotpassword={forgotpassword}
                                setForgotPassword={setForgotPassword}
                                unameError={unameError}
                                passwordError={passwordError}
                                setPasswordError={setPasswordError} />
                    </div>
                    <div className={`${signup} mx-auto w-full my-6`}>
                                <Signup 
                                signupData={signupData}
                                setSignupData={setSignupData}/>
                    </div>
                    
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                        <SubmitButton 
                        unameOrRno={name}
                        password={password}
                        type={login}
                        unameError={unameError}
                        setUnameError = {setUnameError}
                        passwordError={passwordError}
                        setPasswordError={setPasswordError}
                        forgotpassword = {forgotpassword}
                        />
                    </div>
            </div>
            <div className={`absolute ${OTP}`}>This is the otp div</div>
        </div>
    )
}
export default LoginAndSignUpPage;