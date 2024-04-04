const jwt = require("jsonwebtoken");
const { secretKey } = require("../utils/utils.js");
const errorHandler = require("./errors.js");

const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.header("Authorization");
  if (!authorizationHeader) {
    return res
      .status(401)
      .json({ message: "Token de autorización no proporcionado" });
  }

  const token = authorizationHeader.split("Bearer ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token de autorización no válido" });
  }

  try {
    jwt.verify(token, secretKey);
    next();
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports = authMiddleware;
