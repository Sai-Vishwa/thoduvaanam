const { Router } = require("express");
const {startSolvingQuestion} = require("../submissionAndVerify/startSolvingQuestion");
const { startSolvingContest } = require("../submissionAndVerify/startSolvingContest");
const { check } = require("../submissionAndVerify/check");
const { submitContest } = require("../submissionAndVerify/submitContest");

const router = new Router();

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };


  router.post('/solve-question', asyncHandler(async (req, res) => {
    await startSolvingQuestion(req,res)
  }));

  router.post('/solve-contest', asyncHandler(async (req, res) => {
    await startSolvingContest(req,res)
  }));

  router.post('/check-submission', asyncHandler(async (req, res) => {
    await check(req,res)
  }));

  router.post('/submit-contest', asyncHandler(async (req, res) => {
    await submitContest(req,res)
  }));

module.exports = {
    router
}