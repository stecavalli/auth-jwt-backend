const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const os = require("os");
const authRoutes = require("./routes/auth");
const User = require("./models/User"); // Assicurati che esista
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: "https://react-jwt-pswcriptate.netlify.app", // Cambia con il tuo sito reale
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Serve file statici (CSS, immagini)
app.use(express.static(path.join(__dirname, "public")));

// Rotte API
app.use("/api", authRoutes);

// Middleware di gestione errori
app.use((err, req, res, next) => {
  console.error(err.stack); // Stampa lo stack dell'errore per il debug
  res.status(500).json({ message: "Errore interno del server." }); // Risposta generica per l'errore
});

// Homepage stilizzata
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="it">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Backend Online</title>
      <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>">
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <div class="stars"></div>
      <div class="content-box">
        <h1>Backend Online!</h1>
        <p>Server in ascolto sulla porta <strong>${port}</strong></p>
        <a href="/status" class="button-link">📡 Stato Server</a>
        <a href="/api" class="button-link" style="margin-left: 1rem;">📦 API</a>
      </div>
    </body>
    </html>
  `);
});

// Pagina /status avanzata (HTML + JSON)
app.get("/status", async (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  const serverTime = new Date().toLocaleString("it-IT", { timeZone: "Europe/Rome" });
  const uptimeSeconds = process.uptime();
  const uptimeMinutes = Math.floor(uptimeSeconds / 60);
  const uptimeFormatted = `${uptimeMinutes} minuti e ${Math.floor(uptimeSeconds % 60)} secondi`;
  const hostname = os.hostname();
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  let userCount = 0;
  try {
    userCount = await User.countDocuments();
  } catch (err) {
    console.error("Errore nel conteggio utenti:", err);
  }

  if (req.query.format === "json") {
    return res.json({
      mongodb: isConnected ? "connected" : "disconnected",
      serverTime,
      uptime: uptimeFormatted,
      userCount,
      hostname,
      clientIP,
    });
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="it">
    <head>
      <meta charset="UTF-8" />
      <title>Status del Server</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="content-box">
        <h1>Status Server 📡</h1>
        <p><strong>Database MongoDB:</strong> ${isConnected ? "✅ Connesso" : "❌ Disconnesso"}</p>
        <p><strong>Ora Server:</strong> ${serverTime}</p>
        <p><strong>Uptime Server:</strong> ${uptimeFormatted}</p>
        <p><strong>Utenti nel Database:</strong> 👤 ${userCount}</p>
        <p><strong>Hostname:</strong> 🖥️ ${hostname}</p>
        <p><strong>IP Client:</strong> 🌐 ${clientIP}</p>
        <a href="/" class="button-link">🏠 Torna alla Home</a>
        <a href="/status?format=json" class="button-link" style="margin-left: 1rem;">📦 JSON</a>
      </div>
    </body>
    </html>
  `);
});

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connesso a MongoDB");
    app.listen(port, () => {
      console.log(`Server in ascolto sulla porta ${port}`);
    });
  })
  .catch((err) => {
    console.error("Errore nella connessione a MongoDB:", err);
    process.exit(1); // Termina il processo se la connessione al DB fallisce
  });
