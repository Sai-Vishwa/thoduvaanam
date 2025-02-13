const { Router } = require("express");
const { update } = require("../update/updateProfile");
const { verifySubmission } = require("../submissionVerify/verifySubmission");
const { homePage } = require("../pageHandler/homePage");
const { questionPage } = require("../pageHandler/questionPage");
const { leaderBoard } = require("../pageHandler/leaderBoard");
const { ContestBasicPage } = require("../pageHandler/contestBasicPage");

const router =  new Router();

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

  router.post('/update', asyncHandler(async (req, res) => {
    await update(req,res);
  }));

  router.post('/verify-submission', asyncHandler(async (req, res) => {
    await verifySubmission(req,res);
  }));

  router.post('/home', asyncHandler(async (req, res) => {
    await homePage(req,res);
  }));

  router.post('/question', asyncHandler(async (req, res) => {
    await questionPage(req,res);
  }));

  router.post('/contest-basic', asyncHandler(async (req, res) => {
    await ContestBasicPage(req,res);
  }));
  
  router.post('/leaderboard', asyncHandler(async (req, res) => {
    await leaderBoard(req,res);
  }));

  router.get('/', asyncHandler(async (req, res) => {
    console.log("im called")
    res.status(200).json({
        msg:"Hi Iam working"
    })
  }));

module.exports = {
    router
}