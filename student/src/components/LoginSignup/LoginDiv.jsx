import { useState } from "react";

function Login({setName , setPassword ,forgotpassword , setForgotPassword,unameError,passwordError ,setPasswordError}){

    
    return(
    <div className="w-full h-full text-red-600 block mt-4 mb-6 relative">
        <input type="text" placeholder="Enter uname/regno" onChange={(e)=>{setName(e.target.value)}} className="p-2 w-full mb-0 mt-2"/>
        <div className="flex items-baseline mb-3">
        <p className={`text-sm ${unameError.style}`}>{unameError.val}</p>
        </div>
        <input type="password" placeholder="Enter Password" onChange={(e)=>{setPassword(e.target.value)}} className={`p-2 w-full mb-0 ${forgotpassword.style}`}/>
        <div className="flex items-baseline mb-3">
        <p className={`text-sm ${passwordError.style} ${forgotpassword.style}`}>{passwordError.val}</p>
        </div>
        <div className="text-white text-md hover:underline" onClick={()=>{
            if(forgotpassword.style=="block"){
                setForgotPassword({"val":"remember password?","style":"hidden"});setPasswordError({"val":"Kathula ola otirukken","style":"text-red-800"});
            }
            else{
                setForgotPassword({"val":"forgot password?","style":"block"});
            }
        }
        }>
        {forgotpassword.val}
        </div>
    </div>)
}
export default Login;