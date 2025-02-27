import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import Header from '../../components/LoginPageComponents/Header';
import OtpVerifyButton from '../../components/LoginPageComponents/otpVerifyButton';


const SignUpPage = () => {
  
  const nav = useNavigate();
  const [otpDiv, setOtpDiv] = useState("hidden");
  const [otpData, setOtpData] = useState("");

  const [disable , setDisable ] = useState(false)
  const [otpdis , setOtpdis] = useState(false)
  
  const [signupData, setSignupData] = useState({
    name: "",
    uname: "",
    rno: "",
    leetCodeProfile: "",
    password: "",
    verifyPassword: "",
    isVerified: false
  });

  
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!window.confirm("All your data will be lost.. Sure wanna continue???")) {
        event.preventDefault();
        event.returnValue = "";
      } else {
        fetch("http://localhost:4000/login-signup/force-quit-signup", { method: "POST" });
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const verifyUsername = async (val) => {

    let status = false
    let dt = {}
    const dummy =  await new Promise ((resolve)=>{
      toast.promise(new Promise((resolve,reject)=>{
        fetch("http://localhost:4000/login-signup/uname-verify", {
          method: "POST",
          body: JSON.stringify({ "uname": val }),
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
          return (`You can use this user name`)
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
    if(status){
      setSignupData(prev => ({ ...prev, isVerified: true , uname: val }));
    }
    else{
      setSignupData(prev => ({ ...prev, isVerified: false , uname: val }));
    }
  };

  const handleSignup = async () => {

    if (!/^2[234]\d{7}$/.test(signupData.rno)) {
      toast.error("Enter a valid username",{
        style: {
          fontSize:"1.125rem",
          fontWeight:300,
          padding:20
        }
      })
      return
    }

    if(!signupData.isVerified || signupData.uname.length<1){
      toast.error("Have a valid user name vro",{
        style: {
          fontSize:"1.125rem",
          fontWeight:300,
          padding:20
        }
      })
      return 
    }

    if(signupData.password.length<1 || signupData.verifyPassword.length<1 || signupData.password!==signupData.verifyPassword){
      toast.error("Have a valid password vro",{
        style: {
          fontSize:"1.125rem",
          fontWeight:300,
          padding:20
        }
      })
      return 
    }

    setDisable(true)
    let status = false
    let dt = {}
    const dummy =  await new Promise ((resolve)=>{
      toast.promise(new Promise((resolve,reject)=>{
        fetch("http://localhost:4000/login-signup/signup", {
          method: "POST",
          body: JSON.stringify(signupData),
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
          return (`Otp sent to your mail id successfully`)
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

    if(status){
      setOtpDiv("block")
      setDisable(true)
    }
    else{
      setDisable(false)
    }
  };

  const handleVerifyOTP = async () => {

    let status = false
            let dt = {}
            setOtpdis(true)
            const dummy =  await new Promise ((resolve)=>{
                toast.promise(new Promise((resolve,reject)=>{
                  fetch("http://localhost:4000/login-signup/otp-verify-signup", {
                    method: "POST",
                    body: JSON.stringify({ rno: signupData.rno, otp: otpData }),
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
    <div className="min-h-screen min-w-screen overflow-hidden bg-[#ff4a5f] flex items-center justify-center font-mono relative">
      <motion.div
      className="bg-white p-8 rounded-lg shadow-lg mx-10 max-w-md w-full border-2 border-[#000015] border-t-[6px] relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>

      <motion.div className='absolute transform top-0 right-0 translate-x-0 -translate-y-[70px]'>
                <img src="/download__5_-removebg-preview.png" alt="" className='w-[120px]'/>
      </motion.div>
      
      <div className="text-center mb-8">
            <Header 
            data1={"Hey New User..!!"}
            data2={"Sign up first to continue"}/>
        </div>

        
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          

            
            <div>
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                className="w-full px-4 py-2 focus:outline-none border rounded-lg focus:ring-2 focus:ring-[#000015] focus:border-transparent"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setSignupData({ ...signupData, uname: e.target.value });
                  verifyUsername(e.target.value);
                }}
                className="w-full px-4 py-2 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-[#000015] focus:border-transparent"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="College Roll Number"
                onChange={(e) => setSignupData({ ...signupData, rno: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000015] focus:border-transparent"
              />
            </div>

            <div>
              <input
                type="url"
                placeholder="LeetCode Profile URL"
                onChange={(e) => setSignupData({ ...signupData, leetCodeProfile: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000015] focus:border-transparent"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                className="w-full px-4 py-2 border  focus:outline-none rounded-lg focus:ring-2 focus:ring-[#000015] focus:border-transparent"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setSignupData({ ...signupData, verifyPassword: e.target.value })}
                className="w-full px-4 py-2 border focus:outline-none rounded-lg focus:ring-2 focus:ring-[#000015] focus:border-transparent"
              />
            </div>


            <Toaster duration={3000} position="bottom-right"/>
            <motion.button
            layout
            onClick={handleSignup}
            className={`w-full bg-[#000015] text-white py-2 rounded-lg hover:bg-gray-900 transition-colors font-mono ${disable==true?"hidden":"block"}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={disable}
          >
            {"Send OTP"}
          </motion.button>

                </motion.div>
          
                <AnimatePresence>
          {otpDiv === "block" && (
            <motion.div 
              className="mt-4 p-4 bg-gray-50 rounded-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <p className="text-[#000015] font-mono">Enter OTP sent to your email</p>
              <input
                onChange={(e)=>{setOtpData(e.target.value);console.log(otpData)}}
                disabled={otpdis}
                type="text"
                placeholder="Enter OTP"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#000015] bg-transparent font-mono"
              />
              <div className="mt-3">
                  <OtpVerifyButton 
                  otp={otpVal}
                  rno={loginData.rno}
                  disable={disable}
                  setDisable={setDisable}
                  otpdis = {otpdis}
                  setOtpdis = {setOtpdis}/>
              </div>
              
            </motion.div>

          )}
        </AnimatePresence>
          
        <motion.div 
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => nav("/login")}
              className="text-[#000015] hover:text-gray-800 font-bold"
            >
              Login
            </button>
          </p>
        </motion.div>
        
      </motion.div>
    </div>
  );
};

export default SignUpPage;