const { Router } = require("express");
const { update } = require("../update/updateProfile");
const { verifySubmission } = require("../submissionVerify/verifySubmission");

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
  
  router.get('/', asyncHandler(async (req, res) => {
    res.status(200).json({
        msg:"Hi Iam working"
    })
  }));

module.exports = {
    router
}