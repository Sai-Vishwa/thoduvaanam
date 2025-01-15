function Signup({signupData , setSignupData}){
    
    return(
    <div className="w-full h-full text-red-800 block mt-4 mb-8">
        <input type="text" placeholder={signupData.name} onChange={(e)=>{setSignupData({...signupData ,"name":e.target.value})}} className="p-2 w-full mb-4 required:"/>
        <input type="text" placeholder={signupData.uname} onChange={(e)=>{setSignupData({...signupData ,"uname":e.target.value})}} className="p-2 w-full mb-4"/>
        <input type="text" placeholder={signupData.rno} onChange={(e)=>{setSignupData({...signupData ,"rno":e.target.value})}} className="p-2 w-full mb-4"/>
        <input type="text" placeholder={signupData.leetCodeName} onChange={(e)=>{setSignupData({...signupData ,"leetCodeName":e.target.value})}} className="p-2 w-full mb-4"/>
        <input type="text" placeholder={signupData.leetCodeProfile} onChange={(e)=>{setSignupData({...signupData ,"leetCodeProfile":e.target.value})}} className="p-2 w-full mb-4"/>
        <input type="password" placeholder={signupData.password} onChange={(e)=>{setSignupData({...signupData ,"password":e.target.value})}} className="p-2 w-full mb-4"/>
        <input type="text" placeholder={signupData.verifyPassword} onChange={(e)=>{setSignupData({...signupData ,"verifyPassword":e.target.value})}} className="p-2 w-full mb-4"/>
    </div>)
}
export default Signup;