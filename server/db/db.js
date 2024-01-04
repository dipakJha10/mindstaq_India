const mongoose = require("mongoose");

var mongoDB =
  "mongodb+srv://Deepak19:User123@cluster0.xxi7jba.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function () {
  console.log("Connected to DB");
});

module.exports = db;
