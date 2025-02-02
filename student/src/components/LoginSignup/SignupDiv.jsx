import './login.css'
function Signup({signupData , setSignupData}){
    
    return(
        <div className="signupdiv">
 <div className="block">
                <input type="text" placeholder="Enter your full name" onChange={(e)=>{setSignupData({...signupData ,"name":e.target.value})}} className="p-1 mb-1 required:"/>

        <input type="text" placeholder="Enter an unique username to identify you" onChange={(e)=>{setSignupData({...signupData ,"uname":e.target.value})}} className="p-1 mb-1"/>
        <input type="text" placeholder="Enter your college roll no" onChange={(e)=>{setSignupData({...signupData ,"rno":e.target.value})}} className="p-1 mb-1"/>
        <input type="text" placeholder="Enter your leetcode profile name" onChange={(e)=>{setSignupData({...signupData ,"leetCodeName":e.target.value})}} className="p-1  mb-1"/>
        <input type="url" placeholder="Share your leetcode profile link" onChange={(e)=>{setSignupData({...signupData ,"leetCodeProfile":e.target.value})}} className="p-1 mb-1"/>
        <input type="password" placeholder="Set a strong password" onChange={(e)=>{setSignupData({...signupData ,"password":e.target.value})}} className="p-1 mb-1"/>
        <input type="text" placeholder="Re-Enter your password" onChange={(e)=>{setSignupData({...signupData ,"verifyPassword":e.target.value})}} className="p-1 mb-2"/>
    </div>
        </div>
   )
}
export default Signup;