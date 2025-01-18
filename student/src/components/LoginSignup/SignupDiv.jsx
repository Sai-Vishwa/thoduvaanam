function Signup({signupData , setSignupData}){
    
    return(
    <div className="w-full h-full text-red-600 block mt-4 mb-8">
                <input type="text" placeholder="Enter your full name" onChange={(e)=>{setSignupData({...signupData ,"name":e.target.value})}} className="p-2 w-full mb-4 required:"/>

        <input type="text" placeholder="Enter an unique username to identify you" onChange={(e)=>{setSignupData({...signupData ,"uname":e.target.value})}} className="p-2 w-full mb-4"/>
        <input type="text" placeholder="Enter your college roll no Eg 220701201" onChange={(e)=>{setSignupData({...signupData ,"rno":e.target.value})}} className="p-2 w-full mb-4"/>
        <input type="text" placeholder="Enter your leetcode profile name" onChange={(e)=>{setSignupData({...signupData ,"leetCodeName":e.target.value})}} className="p-2 w-full mb-4"/>
        <input type="text" placeholder="Share your leetcode profile link" onChange={(e)=>{setSignupData({...signupData ,"leetCodeProfile":e.target.value})}} className="p-2 w-full mb-4"/>
        <input type="password" placeholder="Set a strong password" onChange={(e)=>{setSignupData({...signupData ,"password":e.target.value})}} className="p-2 w-full mb-4"/>
        <input type="text" placeholder="Re-Enter your password again" onChange={(e)=>{setSignupData({...signupData ,"verifyPassword":e.target.value})}} className="p-2 w-full mb-4"/>
    </div>)
}
export default Signup;