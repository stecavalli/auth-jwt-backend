const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: "https://NOME_SITO_PERSONALIZZATO.netlify.app",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("Ciao dal backend");
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connesso a MongoDB");
    app.listen(port, () => {
      console.log(`Server in ascolto su http://localhost:${port}`);
    });
  })
  .catch((err) => console.error("Errore nella connessione a MongoDB:", err));