const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/book");
const argv = require("yargs").argv;
const chalk = require("chalk");

console.log(argv);

const app = express();

// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(argv.port || 3000, () => {
  console.log(chalk.green("now listening for requests on port 4000"));
});
