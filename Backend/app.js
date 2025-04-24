const express = require('express');

const bodyParser = require('body-parser');

const UserRouter = require('./adminapi/adminapi/route/router.js');

const AdminRouter = require('./adminapi/adminapi/route/router.js');

const cors = require('cors');

require("dotenv").config();






const app = express();

app.use(cors());



app.use(express.json());

app.use(express.urlencoded({ extended: true }));





app.use('/2025/butler_hospitality/server/webservice', UserRouter);

app.use('/2025/butler_hospitality/server/adminapi', AdminRouter);


app.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});

