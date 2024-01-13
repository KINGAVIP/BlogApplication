const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://avipruthi8:test123@cluster0.wouviu8.mongodb.net/BlogApp?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongodb conenction error"));

db.once("open", () => {
  console.log("connected to db");
});

module.exports = db;
