const firebase = require("../firebase/initFirebase");

exports.verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const idToken = token.split(" ")[1];

  try {
    const decodedToken = await firebase.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
