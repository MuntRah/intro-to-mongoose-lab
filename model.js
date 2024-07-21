const mongoose = require("mongoose");
const solveSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
const solve = mongoose.model("solve", solveSchema);
module.exports = solve;
