const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = Schema({
  name: String,
  age: Number
});

module.exports = new mongoose.model("Author", AuthorSchema);
