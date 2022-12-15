require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

app.use("/", apiRouter);

app.listen(5000, () => console.log('Listening on http://localhost:5000/'));


module.exports = app;
