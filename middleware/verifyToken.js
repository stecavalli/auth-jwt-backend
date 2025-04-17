const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Token mancante" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token non valido" });
    console.log("Payload del token:", user);
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
