const { Router } = require("express");
const {startSolvingQuestion} = require("../submissionAndVerify/startSolvingQuestion")

const router = new Router();

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

  router.post('/submit', asyncHandler(async (req, res) => {
    await verifyOTPforSignUp(req,res);
  }));

  router.post('/solve-question', asyncHandler(async (req, res) => {
    await startSolvingQuestion(req,res)
  }));

module.exports = {
    router
}