const { Router } = require("express");
const { update } = require("../update/updateProfile");
const { verifySubmission } = require("../submissionVerify/verifySubmission");
const { homePage } = require("../pageHandler/homePage");
const { questionPage } = require("../pageHandler/questionPage");
const { leaderBoard } = require("../pageHandler/leaderBoard");
const { ContestBasicPage } = require("../pageHandler/contestBasicPage");
const { contestHandlerPage } = require("../pageHandler/contestHandlerPage");
const { contestReviewPage } = require("../pageHandler/contestReviewPage");
const { codingPage } = require("../pageHandler/codingPage");
const { loadData } = require("../pageHandler/adminInfoPage");
const { updateTopics } = require("../update/updateTopics");

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
  
  router.post('/contest-handle', asyncHandler(async (req, res) => {
    await contestHandlerPage(req,res);
  }));

  router.post('/contest-review', asyncHandler(async (req, res) => {
    await contestReviewPage(req,res);
  }));

  router.post('/leaderboard', asyncHandler(async (req, res) => {
    await leaderBoard(req,res);
  }));

  router.post('/coding-page', asyncHandler(async (req, res) => {
    await codingPage(req,res);
  }));

  router.post('/admin-load', asyncHandler(async (req, res) => {
    await loadData(req,res);
  }));


  router.post('/admin-update', asyncHandler(async (req, res) => {
    await updateTopics(req,res);
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