const Blog = require("../models/Blog");
const db = require("../config/database");
exports.signUp = (req, res) => {
  var name = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var data = {
    username: name,
    email: email,
    password: password,
  };
  db.collection("Users").insertOne(data, function (err, collection) {
    if (err) throw err;
    console.log("Record inserted successufully byb me");
  });
  return res.send(200);
};

exports.signIn = async (req, res) => {
  var email = req.body.email;
  var pass = req.body.password;
  const user = await db.collection("Users").findOne({ email: req.body.email });
  if (user) {
    const result = pass === user.password;
    if (result) {
      // res.render("Secret");
      // console.log("success");
      return res.send({ message: "Successfully login" });
    } else {
      return res.send({ error: "Password dont match" });
    }
  } else {
    return res.send({ error: "User dont exist" });
  }
};

exports.getUser = async (req, res) => {
  const email = req.query.email;
  console.log(email);
  try {
    const getdata = await Blog.find({ email: email });
    return res.send(getdata);
  } catch (err) {
    return res.send({ error: "Cant get" });
  }
};
