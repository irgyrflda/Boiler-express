const cors = require("cors");
const express = require('express');
const indexRouter = require('./src/routes/index');
const app = express();
// const https = require("https");
const bodyParser = require("body-parser");
const db = require("./src/config/database");
const PORT = process.env.PORT;
const errorHandler = require("./src/middleware/errorHandler");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/example/:id', (req, res) => {
  console.log(req.params); // Pastikan req.params tidak kosong
  console.log(req.body); // Periksa req.body
  res.send('Received data');
})
app.use('/', indexRouter);

app.use(errorHandler);

db.authenticate()
  .then(() => {
    app.listen(PORT, console.log(`server running...on Port ${PORT}`));
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });