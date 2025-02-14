import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const nav = useNavigate();
  const [otpDiv, setOtpDiv] = useState("hidden");
  const [otpData, setOtpData] = useState("");
  const [otpError, setOtpError] = useState("");
  
  const [signupData, setSignupData] = useState({
    name: "",
    uname: "",
    rno: "",
    leetCodeName: "",
    leetCodeProfile: "",
    password: "",
    verifyPassword: "",
    isVerified: false
  });

  const [signupError, setSignupError] = useState({
    nameError: "",
    unameError: "",
    rnoError: "",
    leetCodeNameError: "",
    leetCodeProfileError: "",
    passwordError: "",
    verifyPasswordError: "",
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
    try {
      const response = await fetch("http://localhost:4000/login-signup/uname-verify", {
        method: "POST",
        body: JSON.stringify({ "uname": val }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      if (data.msg) {
        setSignupError(prev => ({ ...prev, isVerified: true, uname: "" }));
      } else {
        throw new Error(data);
      }
    } catch (error) {
      alert(JSON.stringify(error.message));
      setSignupError(prev => ({ ...prev, isVerified: false, uname: "Username is taken" }));
    }
  };

  const handleSignup = async () => {
    let flag = true;
    try {
      if (!signupError.isVerified) {
        setSignupError(prev => ({ ...prev, uname: "Username not verified" }));
        flag = false;
      }

      if (flag) {
        const response = await fetch("http://localhost:4000/login-signup/signup", {
          method: "POST",
          body: JSON.stringify(signupData),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        const data = await response.json();
        if (data.msg) {
          setOtpDiv("block");
        } else {
          throw new Error(data);
        }
      }
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  const handleVerifyOTP = async () => {
    // alert(otpData)
    console.log(otpData)
    try {
      const response = await fetch("http://localhost:4000/login-signup/otp-verify-signup", {
        method: "POST",
        body: JSON.stringify({ rno: signupData.rno, otp: otpData }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      if (data.msg) {
        nav("/login");
      } else {
        throw new Error(data);
      }
    } catch (error) {
      setOtpError("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-600">Please sign up to continue!</p>
        </div>

        <div className="mt-8 space-y-6">
          {/* Signup Form */}
          <div className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {signupError.nameError && (
                <p className="text-red-500 text-sm mt-1">{signupError.nameError}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => {
                  setSignupData({ ...signupData, uname: e.target.value });
                  verifyUsername(e.target.value);
                }}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {signupError.uname && (
                <p className="text-red-500 text-sm mt-1">{signupError.uname}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="College Roll Number"
                onChange={(e) => setSignupData({ ...signupData, rno: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {signupError.rnoError && (
                <p className="text-red-500 text-sm mt-1">{signupError.rnoError}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="LeetCode Username"
                onChange={(e) => setSignupData({ ...signupData, leetCodeName: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {signupError.leetCodeNameError && (
                <p className="text-red-500 text-sm mt-1">{signupError.leetCodeNameError}</p>
              )}
            </div>

            <div>
              <input
                type="url"
                placeholder="LeetCode Profile URL"
                onChange={(e) => setSignupData({ ...signupData, leetCodeProfile: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {signupError.leetCodeProfileError && (
                <p className="text-red-500 text-sm mt-1">{signupError.leetCodeProfileError}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {signupError.passwordError && (
                <p className="text-red-500 text-sm mt-1">{signupError.passwordError}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setSignupData({ ...signupData, verifyPassword: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {signupError.verifyPasswordError && (
                <p className="text-red-500 text-sm mt-1">{signupError.verifyPasswordError}</p>
              )}
            </div>
          </div>

          <button
            onClick={handleSignup}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>

          {/* OTP Section */}
          {otpDiv === "block" && (
            <div className="mt-6 space-y-4">
              <div className="flex gap-2 justify-between">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    onChange={(e) => {
                      const value = e.target.value;
                      setOtpData(prev => {
                        const newOtp = prev.split('');
                        newOtp[index] = value;
                        return newOtp.join('');
                      });
                      if (value && e.target.nextSibling) {
                        e.target.nextSibling.focus();
                      }
                    }}
                    className="w-12 h-12 text-center border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ))}
              </div>
              {otpError && (
                <p className="text-red-500 text-sm text-center">{otpError}</p>
              )}
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    // Add resend OTP logic here
                  }}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Resend OTP
                </button>
                <button
                  onClick={handleVerifyOTP}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Verify OTP
                </button>
              </div>
            </div>
          )}

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => nav("/login")}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;