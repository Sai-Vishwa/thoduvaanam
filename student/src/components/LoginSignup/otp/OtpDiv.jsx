import { useState } from "react";
import ResendButton from "./resendButton";

function OtpDiv(OtpDiv){
     
    return (
        <div className={`${OtpDiv}`}>
                <input type="text" placeholder="Enter Roll no" onChange={(e)=>{setLoginData({...loginData , "rno":e.target.value})}} className="p-2 w-full mb-0 mt-2"/>
                <div className="text-red-500 text-xs mb-3 p-0 flex items-baseline">
                    <p>{loginError.rnoError}</p>
                </div>
                <ResendButton />
        </div>
    )
}
export default OtpDiv;