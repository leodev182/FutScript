function errorHandler(e, req, res) {
  console.log(e);
  if (e.name === "JsonWebTokenError") {
    // Error de autenticación JWT
    return res.status(401).json({ error: "Token de autorización inválido" });
  } else {
    console.log(e.code, e.message);
    // Otros tipos de errores
    return res
      .status(e.code || 500)
      .json({ message: e.message || "Error interno del servidor" });
  }
}

module.exports = errorHandler;
