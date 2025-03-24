const { Router } = require("express");
const { loadData } = require("../services/loadData");
const { addTopic } = require("../services/addTopic");
const { addQuestion } = require("../services/addQuestion");
const { addTestCase } = require("../services/addTestCase");
const { addContest } = require("../services/addContest");

const router = new Router();

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

  router.get("/",asyncHandler(async (req,res)=>{
    console.log("auth is working");
    res.status(200).send("HI IAM WORKING");
  }))

  router.post('/load', asyncHandler(async (req, res) => {
    // console.log("hey inisde router")
    await loadData(req,res);
  }));

  router.post('/addTopic', asyncHandler(async (req, res) => {
    // console.log("hey inisde router")
    console.log("im calling add topic ")
    await addTopic(req,res);
  }));

  router.post('/addQuestion', asyncHandler(async (req, res) => {
    // console.log("hey inisde router")
    console.log("im calling add topic ")
    await addQuestion(req,res);
  }));

  router.post('/addTestCase', asyncHandler(async (req, res) => {
    // console.log("hey inisde router")
    console.log("im calling add topic ")
    await addTestCase(req,res);
  }));

  router.post('/addContest', asyncHandler(async (req, res) => {
    // console.log("hey inisde router")
    console.log("im calling add topic ")
    await addContest(req,res);
  }));
module.exports = {
    router
};