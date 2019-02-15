const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = Schema({
  name: String,
  gener: String,
  antuor: String
});

module.exports = new mongoose.model("Book", BookSchema);
