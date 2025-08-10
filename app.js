const express = require("express");
const routes = require("./Routes/routes.js");
const db = require("./db.js").db;
const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

mongoose.connection.once("open", () => {
  db();
});

app.use(express.json());
app.use("", routes);
