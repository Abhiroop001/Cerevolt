const mongoose = require("mongoose");

const ps = mongoose.Schema({
  pname: String,
  pprice: Number,
  pimg: String,      
  pdetails: String,
  ppdf: String      
});

module.exports = mongoose.model("Product", ps);
