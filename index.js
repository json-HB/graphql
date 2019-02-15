const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/book");
const config = require("./argv.js");
const chalk = require("chalk");
const mongoose = require("mongoose");
const { log, J } = require("./util.js");
const bodyParser = require("body-parser");
const Author = require("./models/author");
const fs = require("fs");
console.log(log, J);
mongoose.connect("mongodb://127.0.0.1:27017/haibo");

var db = mongoose.connection;
db.once("open", () => {
  console.log(chalk.yellowBright.bold("success connect!"));
});

// console.log(config.getArgv());

const app = express();
app.use(express.static("asserts"));

app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("hello");
});

app.get("/video", function(req, res) {
  fs.readFile("./asserts/snow.mp3", function(err, data) {
    log(data);
    let one = data.slice(0, parseInt(data.length / 2));
    let two = data.slice(parseInt(data.length / 2));
    res.send(Buffer.concat([one, two]));
    res.end();
  });
});

app.post("/save", function(req, res) {
  log(req.body);
  const { name, age } = req.body;
  Author.create({ name, age }, function(err, data) {
    if (err) {
      return res.send(err);
    }
    res
      .status(200)
      .type("application/json")
      .set({
        "content-type": "application/json",
        Etag: "W/12345"
      })
      .json({
        message: "ok",
        data: req.body
      });
  });
});
// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(config.port || 3000, () => {
  console.log(chalk.green("now listening for requests on port 3000"));
});
