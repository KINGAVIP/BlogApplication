const Blog = require("../models/Blog");
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.send(blogs);
  } catch (err) {
    return res.send({ error: "Cannot fetch" });
  }
};

exports.getBlogbyId = async (req, res) => {
  try {
    const bid = req.query.id;
    console.log(bid);
    const blog = await Blog.findById({ _id: bid });
    return res.send(blog);
  } catch (err) {
    return res.send({ error: "Cant open blog" });
  }
};

exports.delete = async (req, res) => {
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
};

exports.createPost = async (req, res) => {
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
};
