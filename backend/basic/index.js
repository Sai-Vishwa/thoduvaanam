const express = require('express');
const cors = require('cors');
const { router } = require('./router/router');


const app = express();
const port = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/basic', router)

app.listen(port, () => {
  console.log(`all basic requests are handled at http://localhost:${port}`);
})