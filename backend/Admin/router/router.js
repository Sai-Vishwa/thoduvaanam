const { Router } = require("express");
const { loadData } = require("../services/loadData");
const { addTopic } = require("../services/addTopic");

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

module.exports = {
    router
};