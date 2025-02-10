import './login.css'
function Signup({signupData , setSignupData ,signUpError , setSignUpError}){

    async function verify(val){
        try{
            const verification = await fetch("http://localhost:4000/login-signup/uname-verify",{
                method:"POST",
                body: JSON.stringify({"uname":val}),
                headers:{
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            const data = await verification.json()
            if(data.msg){
                setSignUpError({...signUpError , "isVerified" : true , "uname":"" })
            }
            else{
                throw new Error(data)
            }
        }
        catch(error){
            alert(JSON.stringify(error.message))
            setSignUpError({...signUpError , "isVerified" : false , "uname":"user name is taken" })
        }
    }
    
    return(
        <div className="signupdiv">
            <div className="block ">
                <input type="text" placeholder="Enter your full name" onChange={(e)=>{setSignupData({...signupData ,"name":e.target.value})}} className="pr-7 mb-1 w-full" required/>
                <div className="text-red-500 text-xs mb-3 p-0 flex items-baseline">
                    <p>{signUpError.name}</p>
                </div>
                <input type="text" placeholder="Enter an unique username to identify you" onChange={(e)=>{setSignupData({...signupData ,"uname":e.target.value});verify(e.target.value)}} className="pr-7 mb-1  w-full"  required />
                <div className="text-red-500 text-xs mb-3 p-0 flex items-baseline">
                    <p>{signUpError.uname}</p>
                </div>
                <input type="text" placeholder="Enter your college roll no" onChange={(e)=>{setSignupData({...signupData ,"rno":e.target.value})}} className="pr-7  mb-1  w-full" required/>
                <div className="text-red-500 text-xs mb-3 p-0 flex items-baseline">
                    <p>{signUpError.rno}</p>
                </div>
                <input type="text" placeholder="Enter leetcode profile name" onChange={(e)=>{setSignupData({...signupData ,"leetCodeName":e.target.value})}} className="pr-7   mb-1  w-full" required/>
                <div className="text-red-500 text-xs mb-3 p-0 flex items-baseline">
                    <p>{signUpError.leetCodeName}</p>
                </div>
                <input type="url" placeholder="Share leetcode profile link" onChange={(e)=>{setSignupData({...signupData ,"leetCodeProfile":e.target.value})}} className="pr-7 mb-1  w-full"  required/>
                <div className="text-red-500 text-xs mb-3 p-0 flex items-baseline">
                    <p>{signUpError.leetCodeProfile}</p>
                </div>
                <input type="password" placeholder="Set a strong password" onChange={(e)=>{setSignupData({...signupData ,"password":e.target.value})}} className="pr-7  mb-1  w-full"  required/>
                <div className="text-red-500 text-xs mb-3 p-0 flex items-baseline">
                    <p>{signUpError.password}</p>
                </div>
                <input type="text" placeholder="Re-Enter your password" onChange={(e)=>{setSignupData({...signupData ,"verifyPassword":e.target.value})}} className="pr-7 mb-2 w-full"  required/>
                <div className="text-red-500 text-xs mb-3 p-0 flex items-baseline">
                    <p>{signUpError.verifyPassword}</p>
                </div>
             </div>
        </div>
   )
}
export default Signup;