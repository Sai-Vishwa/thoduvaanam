const { Router } = require("express");
const { loadData } = require("../services/loadData");

const router = new Router();

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

  router.get("/",asyncHandler(async (req,res)=>{
    console.log("auth is working");
    res.status(200).send("HI IAM WORKING");
  }))

  router.post('/load', asyncHandler(async (req, res) => {
    console.log("hey inisde router")
    await loadData(req,res);
  }));

module.exports = {
    router
};