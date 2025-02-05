import { useState } from "react"
import { useNavigate } from "react-router-dom"
import SignUpButton from "../../components/LoginSignup/signupButton";

function SignUpPage(){
    const nav = useNavigate();
    const [signupData , setSignupData] = useState({
            "name":"",
            "uname" : "",
            "rno":"",
            "leetCodeName":"",
            "leetCodeProfile":"",
            "password":"",
            "verifyPassword":""
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
        return (<>
        <div className="heading">
                      <h1>Create</h1>
                      <h1>Account,</h1>
                      <h3>Please sign-up to continue !</h3>
                    </div>
                    <div className="signup">
                        <Signup 
                            signupData={signupData}
                            setSignupData={setSignupData}/>
                        <SignUpButton />
                        <div className="Signin pt-3 pb-2"> <p>Already have an account ? <span  onClick={()=>{nav("/login")}} className={` w-1/2 bg-transparent p-2 cursor-pointer pb-3`}>Login</span></p></div>
                    </div>
        </>)
}
export default SignUpPage