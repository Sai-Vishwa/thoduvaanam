import { useState } from "react";
import ResendButton from "./resendButton";
import VerifyButton from "./verifyButton";

function OtpDiv({OtpDiv , otp , setOtp , otpError ,setOtpError }){
     
    return (
        <div className={`${OtpDiv}`}>
                <input type="text" onChange={(e)=>{setOtp(otp + e)}} className="p-2 w-full mb-0 mt-2" maxLength={1}/>
                <input type="text" onChange={(e)=>{setOtp(otp + e)}} className="p-2 w-full mb-0 mt-2" maxLength={1}/>
                <input type="text" onChange={(e)=>{setOtp(otp + e)}} className="p-2 w-full mb-0 mt-2" maxLength={1}/>
                <input type="text" onChange={(e)=>{setOtp(otp + e)}} className="p-2 w-full mb-0 mt-2" maxLength={1}/>
                <input type="text" onChange={(e)=>{setOtp(otp + e)}} className="p-2 w-full mb-0 mt-2" maxLength={1}/>
                <input type="text" onChange={(e)=>{setOtp(otp + e)}} className="p-2 w-full mb-0 mt-2" maxLength={1}/>
                <div className="text-red-500 text-xs mb-3 p-0 flex items-baseline">
                    <p>{otpError}</p>
                </div>
                <ResendButton />
                <VerifyButton />
        </div>
    )
}
export default OtpDiv;