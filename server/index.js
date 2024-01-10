const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb+srv://avipruthi8:test123@cluster0.wouviu8.mongodb.net/BlogApp?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongodb conenction error"));

db.once("open", () => {
  console.log("connected to db");
});

app.listen(5000, () => {
  console.log("listening to port 3000");
});

app.get("/api", (req, res) => {
  res.send("Hello avi");
});
app.get("/api/hi", (req, res) => {
  res.send("Hello king avi");
});
app.post("/api/signup", (req, res) => {
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
});

app.post("/api/signin", async (req, res) => {
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
});

const blogSchema = {
  email: String,
  title: String,
  Description: String,
};
const Blog = mongoose.model("Blog", blogSchema);

app.get("/api/getuser", async (req, res) => {
  const email = req.query.email;
  console.log(email);
  try {
    const getdata = await Blog.find({ email: email });
    return res.send(getdata);
  } catch (err) {
    return res.send({ error: "Cant get" });
  }
});

app.post("/api/create", async (req, res) => {
  const email = req.body.email;
  const title = req.body.title;
  const description = req.body.description;
  const blog = new Blog({
    email: email,
    title: title,
    Description: description,
  });
  try {
    const saved = await blog.save();
    return res.send({ message: "succesffuly added" });
  } catch (err) {
    return res.send({ error: "  CAnnot add" });
  }
});

app.get("/api/all", async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.send(blogs);
  } catch (err) {
    return res.send({ error: "Cannot fetch" });
  }
});

app.get("/api/display", async (req, res) => {
  try {
    const bid = req.query.id;
    console.log(bid);
    const blog = await Blog.findById({ _id: bid });
    return res.send(blog);
  } catch (err) {
    return res.send({ error: "Cant open blog" });
  }
});

app.delete("/api/delete", async (req, res) => {
  try {
    const bid = req.query.id.toString().trim();
    console.log("King");
    // console.log(bid);
    // var bid = "6571fe10a67be72c3466fe32";
    const blog = await Blog.findById(bid);
    console.log(blog);
    if (!blog) return res.send({ error: "blog does nto exist" });
    const del = await Blog.findByIdAndDelete(bid);
    if (del) res.send({ message: "Deleted" });
  } catch (err) {
    res.send({ error: "Not deleted" });
  }
});
