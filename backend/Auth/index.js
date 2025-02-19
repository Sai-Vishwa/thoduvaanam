const express = require('express');
const cors = require('cors');
const { router } = require('./router/router');


const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/login-signup', router)

app.listen(port, () => {
  console.log(`Signup and Login is running at http://localhost:${port}`);
})

app.post("/hi",(req,res)=>{
  res.status(200).json({
    hi:"hi"
  })
})

