const router = require("express").Router();
const User = require("../models/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");

// REGISTER
router.post("/register", async (req, res) => {
  // lets validate the data before we make a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user is already in database
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(400).send("Email already exists");

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
    console.log("user registered");
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Registration failed" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user is already in database
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not found");

  // check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Password");

  res.send("Logged In!");
});
module.exports = router;
