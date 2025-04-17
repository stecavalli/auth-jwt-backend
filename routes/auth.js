const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");

const JWT_SECRET = process.env.JWT_SECRET || "supersegreto";

// REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Verifica se l'email è già registrata
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email già registrata." });
  }

  // Cripta la password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crea un nuovo utente
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(201).json({ message: "Utente registrato con successo!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore durante la registrazione." });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cambia 'username' con 'email' nel controllo
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenziali non valide - Utente non trovato." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Credenziali non valide - Password errata." });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
    const token = jwt.sign(
                    { id: user._id, username: user.username, email: user.email },
                      JWT_SECRET,
                    { expiresIn: "1d" }
                  );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",  // Richieste cross-origin
      secure: true,      // Usa HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 giorno
    });

    res.status(200).json({ message: "Login riuscito" });
  } catch (err) {
    console.error(err); // Aggiungi logging per debug
    res.status(500).json({ message: "Errore nel server." });
  }
});

router.get("/", (req, res) => {
  res.send("Benvenuto nell'API!");
});

// GET /api/me (solo per utenti autenticati)
router.get("/me", verifyToken, (req, res) => {
  const { id, username, email } = req.user; // user è passato dal middleware
  res.json({ user: { id, username, email } });
});
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("id email username");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Errore nel recupero utente" });
  }
});

// GET /api/users - restituisce la lista utenti con chiave "users"
router.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore nel recupero degli utenti" });
  }
});

// DELETE /api/users/:username - elimina un utente (protetto)
router.delete("/users/:username", verifyToken, async (req, res) => {
  try {
    const { username } = req.params;
    await User.deleteOne({ username });
    res.json({ message: `Utente ${username} eliminato.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore durante l'eliminazione" });
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
