const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");

const JWT_SECRET = process.env.JWT_SECRET || "supersegreto";

// REGISTER
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Nome utente già esistente." });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 = saltRounds
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "Registrazione riuscita!" });
  } catch (err) {
    res.status(500).json({ message: "Errore nel server." });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Credenziali non valide." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenziali non valide." });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login riuscito" });
  } catch (err) {
    res.status(500).json({ message: "Errore nel server." });
  }
});

// GET /api/users (solo per utenti autenticati)
router.get("/users", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Non autenticato" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const users = await User.find({}, "username"); // restituisce solo i campi 'username'
    res.json(users); // oppure { users } se vuoi usare data.users nel frontend
  } catch (err) {
    res.status(401).json({ message: "Token non valido" });
  }
});

// LOGOUT
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.json({ message: "Logout effettuato" });
});

module.exports = router;
