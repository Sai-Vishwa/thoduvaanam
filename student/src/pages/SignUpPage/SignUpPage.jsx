import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'sonner';
import Cookies from 'js-cookie';
import Header from '../../components/LoginPageComponents/Header';

const SignUpPage = () => {
  
  const nav = useNavigate();
  const [otpDiv, setOtpDiv] = useState("hidden");
  const [otpData, setOtpData] = useState("");

  const [disable, setDisable] = useState(false);
  const [otpdis, setOtpdis] = useState(false);
  
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
    let status = false;
    let dt = {};
    const dummy = await new Promise((resolve) => {
      toast.promise(new Promise((resolve, reject) => {
        fetch("http://localhost:4000/login-signup/uname-verify", {
          method: "POST",
          body: JSON.stringify({ "uname": val }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).then((resp) => resp.json())
        .then((data) => {
          if(data.err) {
            throw new Error(data.err);
          }
          resolve(data);
        })
        .catch((err) => reject(err));
      }), {
        loading: "Loading...",
        success: (data) => {
          status = true;
          dt = data;
          resolve();
          return ("You can use this user name");
        },
        error: (err) => {
          resolve();
          return (`${err}`);
        },
        style: {
          fontSize: "1.125rem",
          fontWeight: 300,
          padding: 20
        }
      });
    });
    
    if(status) {
      setSignupData(prev => ({ ...prev, isVerified: true, uname: val }));
    } else {
      setSignupData(prev => ({ ...prev, isVerified: false, uname: val }));
    }
  };

  const handleSignup = async () => {
    if (!/^2[234]\d{7}$/.test(signupData.rno)) {
      toast.error("Enter a valid username", {
        style: {
          fontSize: "1.125rem",
          fontWeight: 300,
          padding: 20
        }
      });
      return;
    }

    if(!signupData.isVerified || signupData.uname.length < 1) {
      toast.error("Have a valid user name vro", {
        style: {
          fontSize: "1.125rem",
          fontWeight: 300,
          padding: 20
        }
      });
      return;
    }

    if(signupData.password.length < 1 || signupData.verifyPassword.length < 1 || signupData.password !== signupData.verifyPassword) {
      toast.error("Have a valid password vro", {
        style: {
          fontSize: "1.125rem",
          fontWeight: 300,
          padding: 20
        }
      });
      return;
    }

    setDisable(true);
    let status = false;
    let dt = {};
    const dummy = await new Promise((resolve) => {
      toast.promise(new Promise((resolve, reject) => {
        fetch("http://localhost:4000/login-signup/signup", {
          method: "POST",
          body: JSON.stringify(signupData),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).then((resp) => resp.json())
        .then((data) => {
          if(data.err) {
            throw new Error(data.err);
          }
          resolve(data);
        })
        .catch((err) => reject(err));
      }), {
        loading: "Loading...",
        success: (data) => {
          status = true;
          dt = data;
          resolve();
          return ("Otp sent to your mail id successfully");
        },
        error: (err) => {
          resolve();
          return (`${err}`);
        },
        style: {
          fontSize: "1.125rem",
          fontWeight: 300,
          padding: 20
        }
      });
    });

    if(status) {
      setOtpDiv("block");
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  const handleVerifyOTP = async () => {
    let status = false;
    let dt = {};
    setOtpdis(true);
    const dummy = await new Promise((resolve) => {
      toast.promise(new Promise((resolve, reject) => {
        fetch("http://localhost:4000/login-signup/otp-verify-signup", {
          method: "POST",
          body: JSON.stringify({ rno: signupData.rno, otp: otpData }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).then((resp) => resp.json())
        .then((data) => {
          if(data.err) {
            throw new Error(data.err);
          }
          resolve(data);
        })
        .catch((err) => reject(err));
      }), {
        loading: "Loading...",
        success: (data) => {
          status = true;
          dt = data;
          resolve();
          return ("OTP verified!!");
        },
        error: (err) => {
          resolve();
          return (`${err}`);
        },
        style: {
          fontSize: "1.125rem",
          fontWeight: 300,
          padding: 20
        }
      });
    });
    
    setOtpdis(false);
    if(status) {
      Cookies.set('session', dt?.session, {expires: 10/24});
      nav(`/${dt.uname}/change-password`);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden main flex items-center justify-center font-mono relative py-2">
      <motion.div
        className="px-6 py-4 rounded-[30px] shadow-lg mx-auto max-w-md w-full border-2 border-[#3b3b3b] bg-[#1c1b1b] relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ maxHeight: '95vh', overflowY: 'auto' }}
      >
        <div className="text-center mt-2 mb-4">
          <Header 
            data1={"Hey New User..!!"}
            data2={"Sign up first to continue"}
            type={"text-[24px]"}
            type2={"text-[14px]"}
          />
        </div>

        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div>
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
              className="w-full px-4 py-2 border border-[#ddf3ef] placeholder-[#ddf3ef] rounded-lg focus:outline-none focus:border-0 focus:ring-2 focus:ring-[#2bbdaa] bg-transparent font-mono text-[#ddf3ef] text-sm"
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
              className="w-full px-4 py-2 border border-[#ddf3ef] placeholder-[#ddf3ef] rounded-lg focus:outline-none focus:border-0 focus:ring-2 focus:ring-[#2bbdaa] bg-transparent font-mono text-[#ddf3ef] text-sm"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="College Roll Number"
              onChange={(e) => setSignupData({ ...signupData, rno: e.target.value })}
              className="w-full px-4 py-2 border border-[#ddf3ef] placeholder-[#ddf3ef] rounded-lg focus:outline-none focus:border-0 focus:ring-2 focus:ring-[#2bbdaa] bg-transparent font-mono text-[#ddf3ef] text-sm"
            />
          </div>

          <div>
            <input
              type="url"
              placeholder="LeetCode Profile URL"
              onChange={(e) => setSignupData({ ...signupData, leetCodeProfile: e.target.value })}
              className="w-full px-4 py-2 border border-[#ddf3ef] placeholder-[#ddf3ef] rounded-lg focus:outline-none focus:border-0 focus:ring-2 focus:ring-[#2bbdaa] bg-transparent font-mono text-[#ddf3ef] text-sm"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              className="w-full px-4 py-2 border border-[#ddf3ef] placeholder-[#ddf3ef] rounded-lg focus:outline-none focus:border-0 focus:ring-2 focus:ring-[#2bbdaa] bg-transparent font-mono text-[#ddf3ef] text-sm"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setSignupData({ ...signupData, verifyPassword: e.target.value })}
              className="w-full px-4 py-2 border border-[#ddf3ef] placeholder-[#ddf3ef] rounded-lg focus:outline-none focus:border-0 focus:ring-2 focus:ring-[#2bbdaa] bg-transparent font-mono text-[#ddf3ef] text-sm"
            />
          </div>

          <Toaster duration={3000} position="bottom-right"/>
          
          <motion.button
            layout
            onClick={handleSignup}
            className={`w-full text-[#ddf3ef] border-2 border-[#ddf3ef] py-2 rounded-lg text-sm hover:border-[#2bbdaa] transition-colors font-mono ${disable ? "hidden" : "block"}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={disable}
          >
            {"Send OTP"}
          </motion.button>
        </motion.div>
        
        {/* Absolute OTP overlay */}
        <AnimatePresence>
          {otpDiv === "block" && (
            <motion.div 
              className="absolute inset-0 z-20 flex items-center justify-center bg-[#1c1b1b]/90 rounded-[30px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="w-5/6 px-5 py-6 rounded-[20px] border-2 border-[#3b3b3b] bg-[#1c1b1b]"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <p className="text-[#ddf3ef] font-mono text-center mb-4">Enter OTP sent to your email</p>
                <input
                  onChange={(e) => setOtpData(e.target.value)}
                  disabled={otpdis}
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full px-4 py-2 mb-4 border border-[#ddf3ef] placeholder-[#ddf3ef] rounded-lg focus:outline-none focus:border-0 focus:ring-2 focus:ring-[#2bbdaa] bg-transparent font-mono text-[#ddf3ef] text-sm"
                />
                <motion.button
                  onClick={handleVerifyOTP}
                  className="w-full text-[#ddf3ef] border-2 border-[#ddf3ef] py-2 rounded-lg text-sm hover:border-[#2bbdaa] transition-colors font-mono"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={otpdis}
                >
                  {otpdis ? "Verifying..." : "Verify OTP"}
                </motion.button>
                <motion.button
                  onClick={() => {
                    setOtpDiv("hidden");
                    setDisable(false);
                  }}
                  className="w-full mt-3 text-[#ddf3ef] border border-[#3b3b3b] py-2 rounded-lg text-sm hover:border-[#2bbdaa] transition-colors font-mono"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
          
        <motion.div 
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <p className="text-[#ddf3ef] text-sm">
            Already have an account?{" "}
            <button
              onClick={() => nav("/login")}
              className="text-[#ddf3ef] font-bold basic-1 hover:text-[#2bbdaa] transition-colors"
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