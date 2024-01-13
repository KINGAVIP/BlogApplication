const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");

router.post("/signup", authControllers.signUp);
router.post("/signin", authControllers.signIn);
router.get("/getuser", authControllers.getUser);

module.exports = router;
