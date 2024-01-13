const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(express.json());
app.use("/api", apiRoutes);
app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("listening to port 3000");
});

app.get("/api", (req, res) => {
  res.send("Hello avi");
});
app.get("/api/hi", (req, res) => {
  res.send("Hello king avi");
});
