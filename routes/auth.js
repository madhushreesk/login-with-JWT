const router = require("express").Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
    console.log("user registered");
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send("succcess");
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Registration failed" });
  }
});
module.exports = router;
