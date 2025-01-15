import { useState } from "react";

function Login({setName , setPassword , name , password}){
    
    return(
    <div className="w-full h-full text-red-800 block mt-4 mb-8">
        <input type="text" placeholder={name} onChange={(e)=>{setName(e.target.value)}} className="p-2 w-full mb-4"/>
 
        <input type="password" placeholder={password} onChange={(e)=>{setPassword(e.target.value)}} className="p-2 w-full"/>
    </div>)
}
export default Login;