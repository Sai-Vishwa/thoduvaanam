import { motion } from "framer-motion";
import { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Cookies from "js-cookie"


function SubmitButton({loginData , forgotPassword , setOTPdiv , disable , setDisable}){

    const nav = useNavigate();


    const handleLogin = async () => {



        console.log("hi")
        if(!/^2[234]\d{7}$/.test(loginData.rno)){
            toast.error("Enter a valid username",{
              style: {
                fontSize:"1.125rem",
                fontWeight:300,
                padding:20
              }
            })
            return
        }

        if(!loginData.password ){
          toast.error("Enter a valid password",{
            style: {
              fontSize:"1.125rem",
              fontWeight:300,
              padding:20
            }
          })
          return
        }

        let status = false
        let dt = {};
        setDisable(true)
        const dummy =  await new Promise ((resolve)=>{
          toast.promise(new Promise((resolve,reject)=>{
            fetch("http://localhost:4000/login-signup/login", {
              method: "POST",
              body: JSON.stringify(loginData),
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            }).then((resp)=>resp.json())
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
              return (`Login Successful`)
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
        setDisable(false)
        if(status){
          console.log("i must be second")
          Cookies.set('session',dt?.session,{expires: 10/24})
          nav(`/${dt.uname}`)
        }
      };

      const handleSendOTP = async () => {


        if (!/^2[234]\d{7}$/.test(loginData.rno)) {
          toast.error("Enter a valid username",{
            style: {
              fontSize:"1.125rem",
              fontWeight:300,
              padding:20
            }
          })
          return
        }


        let status = false
        let dt = {};

        setDisable(true)
        const dummy =  await new Promise ((resolve)=>{
          toast.promise(new Promise((resolve,reject)=>{
            fetch("http://localhost:4000/login-signup/forgot-password", {
              method: "POST",
              body: JSON.stringify(loginData),
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
              return (`OTP sent successfully`)
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
        if(status){
          setDisable(true)
          setOTPdiv("block")
        }
        else{
          setDisable(false)
        }
      };


    return (
        <>
            <Toaster duration={3000} position="bottom-right"/>
            <motion.button
            layout
            onClick={forgotPassword.style === "block" ? handleLogin : handleSendOTP}
            className={`w-full bg-[#000015] text-white py-2 rounded-lg hover:bg-gray-900 transition-colors font-mono ${disable==true?"hidden":"block"}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={disable}
          >
            {forgotPassword.style === "block" ? "Login" : "Send OTP"}
          </motion.button>
        </>
    )
}

export default SubmitButton