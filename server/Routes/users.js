const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/users"); // ← add this

// Get All
router.get("/", async (req, res) => {
  try {
    const users = await User.find(); // ← use Mongoose model
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get One
router.get("/:id", async (req, res) => { });

// Create One
router.post("/", async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({          // ← use Mongoose model
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      passwordHash: hash,
    });

    const result = await newUser.save();

    res.status(200).json({
      message: "User created successfully",
      insertedId: result._id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update One
router.patch("/:id", async (req, res) => { });

// Delete One
router.delete("/:id", async (req, res) => { });

module.exports = router;