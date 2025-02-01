const { Router } = require("express");
const { spawnSync, spawn } = require("child_process");



const router = new Router();

router.post('/b', asyncHandler(async (req, res) => {
spawnSync("sleep 10")
  }));

  router.post('/a', asyncHandler(async (req, res) => {
    spawnSync("sleep 10")
      }));



// broooo try running this router. post to /a and then post to /b. You'll understand what i'm trying to say.