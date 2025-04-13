const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersegreto";

function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Non autenticato" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // aggiungo l'utente al request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token non valido" });
  }
}

module.exports = verifyToken;
