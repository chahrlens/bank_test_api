const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const actualToken = token.startsWith("Bearer ") ? token.slice(7) : token;
  jwt.verify(actualToken, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  });
};
