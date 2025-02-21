import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from "sonner";
import Cookies from "js-cookie"

function OtpVerifyButton({otp ,rno ,otpdis , setOtpdis}){
    const nav = useNavigate();

    async function verify() {
        console.log(JSON.stringify({otp:otp , rno:rno}))
        let status = false
        let dt = {}
        setOtpdis(true)
        const dummy =  await new Promise ((resolve)=>{
            toast.promise(new Promise((resolve,reject)=>{
              fetch("http://localhost:4000/login-signup/otp-verify-login", {
                method: "POST",
                body: JSON.stringify({otp:otp , rno:rno}),
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                }
              }).then((resp) => resp.json())
              .then((data)=>{
                if(data.err){
                  throw new Error(data.err)
                }
                resolve(data)
              })
              .catch((err)=> reject(err))
            }),{
              loading: "Loading...",
              success: (data)=>{
                status = true
                dt = data
                console.log("i must be first")
                resolve()
                return (`OTP verified!!`)
              },
              error: (err) => {
                resolve()
                return (`${err}`)
              },
              style: {
                fontSize:"1.125rem",
                fontWeight:300,
                padding:20
              }
            })
          }) 
          console.log("i must be second")
          setOtpdis(false)
          if(status){
            Cookies.set('session',dt?.session,{expires: 10/24})
            nav(`/${dt.uname}/change-password`)
          }
        };

        
    
    return (
        <>
            <Toaster duration={3000} position="bottom-right"/>
            <motion.button
            layout
            onClick={verify}
            disabled={otpdis}
            className="w-full bg-[#000015] text-white py-2 rounded-lg hover:bg-gray-900 transition-colors font-mono"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Verify OTP
          </motion.button>
        </>
    )
}


export default OtpVerifyButton