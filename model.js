const mongoose = require("mongoose");
const solveSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
const customer = mongoose.model("customer", solveSchema);
module.exports = customer;
