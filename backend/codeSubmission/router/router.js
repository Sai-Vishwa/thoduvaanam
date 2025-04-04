const { Router } = require("express");
const {startSolvingQuestion} = require("../submissionAndVerify/startSolvingQuestion");
const { startSolvingContest } = require("../submissionAndVerify/startSolvingContest");
const { check } = require("../submissionAndVerify/check");
const { submitContest } = require("../submissionAndVerify/submitContest");
const { autoSave } = require("../common/autoSave");
const { submitQuestionOfAContest } = require("../submissionAndVerify/submitQuestionOfAContest");
const { submitQuestion } = require("../submissionAndVerify/submitQuestion");

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

  router.post('/submit-question', asyncHandler(async (req, res) => {
    await submitQuestion(req,res)
  }));

  router.post('/auto-save-solution', asyncHandler(async (req, res) => {
    console.log("hey inga paaru vro")
    await autoSave(req,res)
  }));

  router.post('/submit-question-of-a-contest', asyncHandler(async (req, res) => {
    console.log("hey inga paaru vro")
    await submitQuestionOfAContest(req,res)
  }));

module.exports = {
    router
}