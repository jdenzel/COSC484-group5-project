const express = require("express");
const router = express.Router();

// Get All
router.get("/", async (req, res) => {
  try {
    const db = req.app.locals.db;
    const transactionsCollection = db.collection("transactions");

    const transactions = await db.collection("transactions").find().toArray();

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get One
router.get("/:id", async (req, res) => {});

// Create One
router.post("/", async (req, res) => {});

// Update One
router.patch("/:id", async (req, res) => {});

// Delete One
router.delete("/:id", async (req, res) => {});

module.exports = router;
