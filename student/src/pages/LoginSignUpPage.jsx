import { useEffect, useState } from "react";
import Login from "../components/LoginSignup/LoginDiv";
import Signup from "../components/LoginSignup/SignupDiv";
import SubmitButton from "../components/LoginSignup/SubmitButton";

function LoginAndSignUpPage(){
    const [login,setLogin] = useState("block");
    const [signup, setSignup] = useState("hidden");
    const [loginStyle,setLoginStyle] = useState("text-red-800 bg-white");
    const [signupStyle,setSignupStyle] = useState("text-white bg-red-800");
    const [OTP,setOTP] = useState("hidden");
    const [signupData , setSignupData] = useState({
        "name":"Enter your full name",
        "uname" : "Enter an unique username to identify you",
        "rno":"Enter your college roll no Eg 220701201",
        "leetCodeName":"Enter your leetcode profile name",
        "leetCodeProfile":"Share your leetcode profile link",
        "password":"Set a strong password",
        "verifyPassword":"Re-Enter your password again"
    })

    const [name,setName] = useState("Enter uname/regno");
    const [password,setPassword] = useState("Enter Password");

    return (
        <div className="min-h-screen w-screen bg-red-800 text-white relative flex items-center justify-center text-2xl">
            <div className="mx-auto block w-4/12 border-white border-2 relative p-6 rounded-3xl">
                    <div className="mx-auto w-full border-2 border-white flex items-center mt-4 mb-4">
                            <div  onClick={()=>{setLogin("block");setSignup("hidden");setLoginStyle("text-red-800 bg-white");setSignupStyle("text-white bg-red-800")}} className={`${loginStyle} w-1/2 flex justify-center p-2`}>login</div>
                            <div  onClick={()=>{setLogin("hidden");setSignup("block");setSignupStyle("text-red-800 bg-white");setLoginStyle("text-white bg-red-800")}} className={`${signupStyle} w-1/2 flex justify-center p-2`}>signup</div>
                    </div>
                    <div className={`${login} mx-auto w-full my-6`}>
                                <Login 
                                setName = {setName}
                                setPassword = {setPassword}
                                name =  {name}
                                password = {password} />
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
                        />
                    </div>
            </div>
            <div className={`absolute ${OTP}`}>This is the otp div</div>
        </div>
    )
}
export default LoginAndSignUpPage;