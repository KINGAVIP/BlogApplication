const express = require("express");
const router = express.Router();
const apiControllers = require("../controllers/apiControllers");

router.get("/all", apiControllers.getAllBlogs);
router.get("/display", apiControllers.getBlogbyId);
router.delete("/delete", apiControllers.delete);
router.post("/create", apiControllers.createPost);

module.exports = router;
