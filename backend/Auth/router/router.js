const { Router } = require("express");
const { resendOtp } = require("../Signup/resendOtp");
const { login } = require("../Login/login");
const { signUp } = require("../Signup/signup");
const { unameVerify } = require("../Signup/unameVerify");
const { verifyOTPforSignUp } = require("../Signup/otpVerifySignup");
const { forgotPassword } = require("../Login/forgotPassword");
const { verifyOTPforLogin } = require("../Login/otpVerfiyLogin");

const router = new Router();

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

  router.post('/otp-verify-signup', asyncHandler(async (req, res) => {
    await verifyOTPforSignUp(req,res);
  }));

  router.post('/otp-resend', asyncHandler(async (req, res) => {
    await resendOtp(req,res)
  }));

  router.post('/login', asyncHandler(async (req, res) => {
    await login(req,res);
  }));
  
  router.post('/signup', asyncHandler(async (req, res) => {
    await signUp(req,res);
  }));

  router.post('/uname-verify', asyncHandler(async (req, res) => {
    console.log("im here");
    await unameVerify(req,res);
  }));

  router.post('/forgot-password', asyncHandler(async (req, res) => {
    await forgotPassword(req,res);
  }));

  router.post('/otp-verify-login', asyncHandler(async (req, res) => {
    await verifyOTPforLogin(req,res);
  }));

  router.post('/force-quit-signup', asyncHandler(async (req, res) => {
    await forcequit(req,res);
  }));

  router.get("/",asyncHandler(async (req,res)=>{
    console.log("auth is working");
    res.status(200).send("HI IAM WORKING");
  }))
module.exports = {
    router
};