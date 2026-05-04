const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Get All
router.get("/", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const users = await db.collection("users").find().toArray();

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
    const db = req.app.locals.db;

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      passwordHash: hash,
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
    };

    const result = await db.collection("users").insertOne(newUser);

    res.status(200).json({
      message: "User created successfully",
      insertedId: result.insertedId,
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
