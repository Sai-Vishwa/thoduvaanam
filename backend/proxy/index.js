const express = require('express');

const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;
const rateLimit = require("express-rate-limit");
const { authProxy, basicProxy, submissionProxy, adminProxy } = require('./proxy');

const limiter = rateLimit({
    windowMs: 20 * 60 * 1000,
    max: 1000,
    message: "1000 requests inside 20 minutes?!?! Are u seriously intrested in this shit I built?!?!Man u need a break for sure. Wait are u DOS Attacker?? IS THIS CRAP THAT IMPORTANT TO IMPLEMENT A DOS ATTACK.. man I did a pretty good job ig **sob sob.."
})

app.use(cors({
    origin:["http://localhost:5173", "http://localhost:5174"],
    credentials:true,
}));
app.use(express.json());
// app.use(limiter);

app.use((req, res, next) => {
    console.log("Yo this request is now getting called - " + req.path);
    next();
  })
app.use("/login-signup",authProxy);
app.use("/basic",basicProxy);
app.use("/submission",submissionProxy)
app.use("/admin",adminProxy)


app.listen(port, () => {
    console.log(`Backend routes are handled with proxies here at port - ${port}`);
})