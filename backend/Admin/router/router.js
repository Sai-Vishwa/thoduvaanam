const { Router } = require("express");

const router = new Router();

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

  router.get("/",asyncHandler(async (req,res)=>{
    console.log("auth is working");
    res.status(200).send("HI IAM WORKING");
  }))


module.exports = {
    router
};