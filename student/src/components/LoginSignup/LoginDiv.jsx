import { useState } from "react";
import './login.css'

function Login({forgotPassword , loginData , setLoginData , loginError ,setForgotPassword ,setLoginError, setOtpDiv}){

    
    return(
    <div className=" block mt-4 mb-6 relative">
        <input type="text" placeholder="Enter Roll no" onChange={(e)=>{setLoginData({...loginData , "rno":e.target.value})}} className="p-2 w-full mb-0 mt-2"/>
        <div className="text-red-500 text-xs mb-3 p-0 flex items-baseline">
            <p>{loginError.rnoError}</p>
        </div>
        <input type="password" placeholder="Enter Password" onChange={(e)=>{setLoginData({...loginData , "password":e.target.value})}} className={`p-2 w-full mb-1 ${forgotPassword.style}`}/>
        <div className="flex items-baseline mb-3 text-red-500">
            <p className={`text-sm`}>{loginError.passwordError}</p>
        </div>
        <div className="text-blue text-md hover:underline" onClick={()=>{
            if(forgotPassword.style=="block"){
                setForgotPassword({"val":"remember password?","style":"hidden"});setLoginError({...loginError,"passwordError":""});
            }
            else{
                setForgotPassword({"val":"forgot password ?","style":"block"});
            }
        }
        }>
        {forgotPassword.val}
        </div>
    </div>)
}
export default Login;