const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/book");
const config = require("./argv.js");
const chalk = require("chalk");

console.log(config.getArgv());

const app = express();

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
