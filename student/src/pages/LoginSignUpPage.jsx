import { useEffect, useState } from "react";
import Login from "../components/LoginSignup/LoginDiv";
import Signup from "../components/LoginSignup/SignupDiv";

function LoginAndSignUpPage(){
    const [login,setLogin] = useState("block");
    const [signup, setSignup] = useState("hidden");

    const [name,setName] = useState("Enter uname/regno");
    const [password,setPassword] = useState("Enter Password");

    return (
        <div className="min-h-screen w-screen bg-red-800 block text-white">
            <div className="mx-auto w-1/4 border-2 border-white p-2 flex justify-around items-center">
                    <div  onClick={()=>{setLogin("block");setSignup("hidden")}} >login</div>
                    <div onClick={()=>{setLogin("hidden");setSignup("block")}}>signup</div>
            </div>
            <div className="mx-auto w-1/4">
                    <div className={`${login} block`}>
                        <Login 
                        setName = {setName}
                        setPassword = {setPassword}
                        name =  {name}
                        password = {password} />
                    </div>
                    <div className={`${signup}`}>
                        <Signup />
                    </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}
export default LoginAndSignUpPage;