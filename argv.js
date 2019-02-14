const yargs = require("yargs");

var argv;

/**
 * leaning yargs
 * type [number string boolean]
 * default
 * alias
 * option
 * choice
 * describe
 * config
 * usage
 * help
 *
 * ------
 * common method
 */

const config = {
  int() {
    argv = yargs
      .config({ foo: "foo", bar: "bar" })
      .usage("welcome use yargs")
      .alias("a", "array")
      .describe("a", "arrays")
      .default("arr", ["react", "angular"])
      .array("a")
      .alias("p", "port")
      .describe("p", "port listen")
      .default("p", 3000)
      .number("p")
      .alias("s", "size")
      .describe("s", "size change")
      .default("s", "size")
      .string("p")
      .help("h").argv;
    config.int = function() {};
  },
  getArgv() {
    return argv;
  }
};

config.int();

module.exports = exports = config;
