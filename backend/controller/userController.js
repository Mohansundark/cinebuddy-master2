const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "1d" });
};
const userLogin = async (req, res) => {
  // console.log("login");
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    const token = createToken(user._id);
    console.log("logged in!!!");
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const userSignup = async (req, res) => {
  console.log("signup");
  const { email, name, password } = req.body;
  try {
    const user = await userModel.signup(email, name, password);

    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  console.log(email, password);
};

module.exports = {
  userLogin,
  userSignup,
};
