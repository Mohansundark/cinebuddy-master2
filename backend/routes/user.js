const express = require("express");
const { userLogin, userSignup } = require("../controller/userController");
const router = express.Router();
//login routes

router.post("/login", userLogin);

//singup routes

router.post("/signup", userSignup);
module.exports = router;
