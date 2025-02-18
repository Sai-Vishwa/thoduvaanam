import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import "./index.css"

const LoginPage = () => {
  const nav = useNavigate();
  const [OTPdiv, setOTPdiv] = useState("hidden");
  const [inp, setInp] = useState(true);
  const [otpData, setOtpData] = useState("");
  const [otpError, setOtpError] = useState("");
  
  const [loginData, setLoginData] = useState({
    rno: "",
    password: ""
  });
  
  const [loginError, setLoginError] = useState({
    rnoError: "",
    passwordError: ""
  });
  
  const [forgotPassword, setForgotPassword] = useState({
    val: "Forgot password?",
    style: "block"
  });

  const handleLogin = async () => {
    let flag = true;
    
    try {
      const response = await fetch("http://localhost:4000/login-signup/login", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.msg) {
        Cookies.set('session', data.session, { expires: 10/24 });
        alert("Login successful");
        nav(`/${data.uname}`);
      } else {
        throw new Error(JSON.stringify(data));
      }
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  const handleSendOTP = async () => {
    if (!loginData.rno) {
      setLoginError({ ...loginError, rnoError: "Registration number is required" });
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/login-signup/forgot-password", {
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      const status = await response.json();
      if (status.msg) {
        alert("OTP sent successfully");
        setOTPdiv("block");
      }
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  const toggleForgotPassword = () => {
    setForgotPassword(prev => ({
      val: prev.style === "block" ? "Remember password?" : "Forgot password?",
      style: prev.style === "block" ? "hidden" : "block"
    }));
    setLoginError({ ...loginError, passwordError: "" });
  };

  return (
    <div className="min-h-screen min-w-screen overflow-hidden bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-600 mt-2">Please sign in to continue!</p>
        </div>

        {/* Login Form */}
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Registration Number"
              value={loginData.rno}
              onChange={(e) => setLoginData({ ...loginData, rno: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {loginError.rnoError && (
              <p className="text-red-500 text-sm mt-1">{loginError.rnoError}</p>
            )}
          </div>

          {forgotPassword.style === "block" && (
            <div>
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {loginError.passwordError && (
                <p className="text-red-500 text-sm mt-1">{loginError.passwordError}</p>
              )}
            </div>
          )}

          <button
            onClick={forgotPassword.style === "block" ? handleLogin : handleSendOTP}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {forgotPassword.style === "block" ? "Login" : "Send OTP"}
          </button>

          <button
            onClick={toggleForgotPassword}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {forgotPassword.val}
          </button>
        </div>

        {/* OTP Section */}
        {OTPdiv === "block" && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-700">Enter OTP sent to your email</p>
            {/* Add OTP input field here */}
          </div>
        )}

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => nav("/signup")}
              className="text-blue-600 hover:text-blue-800"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;