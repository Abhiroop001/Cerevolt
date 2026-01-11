const mongoose = require("mongoose");

const ds = mongoose.Schema({
  dname: String,
  dqualification: String,
  ddescription: String,
  dimg: String
});

module.exports = mongoose.model("Doctor", ds);
