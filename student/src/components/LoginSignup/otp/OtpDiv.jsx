import { useState } from "react";
import ResendButton from "./resendButton";
import VerifyButton from "./verifyButton";
import { useNavigate } from "react-router-dom";

function OtpDiv({OtpDiv , otpData , setOtpData , otpError ,setOtpError ,rno}){
     const nav = useNavigate();
    return (
        <div className={`${OtpDiv}`}>
                <input type="text" onChange={(e)=>{setOtpData(otpData + e.target.value)}} className="p-2 w-full mb-0 mt-2" maxLength={1}/>
                <input type="text" onChange={(e)=>{setOtpData(otpData + e.target.value)}} className="p-2 w-full mb-0 mt-2" maxLength={1}/>
                <input type="text" onChange={(e)=>{setOtpData(otpData + e.target.value)}} className="p-2 w-full mb-0 mt-2" maxLength={1}/>
                <input type="text" onChange={(e)=>{setOtpData(otpData + e.target.value)}} className="p-2 w-full mb-0 mt-2" maxLength={1}/>
                <input type="text" onChange={(e)=>{setOtpData(otpData + e.target.value)}} className="p-2 w-full mb-0 mt-2" maxLength={1}/>
                <input type="text" onChange={(e)=>{setOtpData(otpData + e.target.value)}} className="p-2 w-full mb-0 mt-2" maxLength={1}/>
                <div className="text-red-500 text-xs mb-3 p-0 flex items-baseline">
                    <p>{otpError}</p>
                </div>
                <ResendButton />
                <VerifyButton 
                type={"signup"}
                rno={rno}
                otp={otpData}/>
        </div>
    )
}
export default OtpDiv;