const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

// Register
router.post("/register", async (req, res) => {
    try {
        const { username, email, password, firstname, lastname } = req.body
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (existingUser) {
            return res.status(400).json({ message: "Email or username unavailable" })
        }

        const newUser = new User({ username, email, passwordHash: hashedPassword, firstname, lastname });

        await newUser.save();

        res.status(201).json({ message: "User registered" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

module.exports = router;