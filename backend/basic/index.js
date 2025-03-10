const express = require('express');
const cors = require('cors');
const { router } = require('./router/router');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 4002;

app.use(cors({
  origin: "http://localhost:4000/basic",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

app.use('/api/v1/basic', router)

app.listen(port, () => {
  console.log(`all basic requests are handled at http://localhost:${port}`);
})