const mongoose = require("../config/database");

const blogSchema = {
  email: String,
  title: String,
  Description: String,
};
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
