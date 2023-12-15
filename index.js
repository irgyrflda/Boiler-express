const cors = require("cors"); //import library cors
const express = require('express');  //import express
const indexRouter = require('./src/routes/index');  //import routes utama
const app = express();
// const https = require("https");
const bodyParser = require("body-parser");  //import library body-parser
const db = require("./src/config/database");  //import config database connecting
const PORT = process.env.PORT;  //import port BE dari ENV
const errorHandler = require("./src/middleware/errorHandler");  //import function  error handler

app.use(bodyParser.urlencoded({ extended: false })); //persing req.body
app.use(bodyParser.json()); //psrsing req.body type json
app.use(cors()); //cors

app.use('/', indexRouter); //index router utama

app.use(errorHandler); //error handler

db.authenticate() //connecting database
  .then(() => {
    app.listen(PORT, console.log(`server running...on Port ${PORT}`)); //berhasil
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error); //error
  });