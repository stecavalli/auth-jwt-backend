const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    console.log("❌ Nessun token presente nei cookie.");
    return res.status(401).json({ message: "Token mancante" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("❌ Token non valido:", err.message);
      return res.status(403).json({ message: "Token non valido" });
    }

    console.log("✅ Token valido! Payload:", user);
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
