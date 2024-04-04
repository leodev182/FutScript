const express = require("express");
const app = express();

app.listen(3000, console.log("SERVER ON"));
app.use(express.json());

const {
  obtenerJugadores,
  registrarJugador,
} = require("./controllers/jugadores");
const { obtenerEquipos, agregarEquipo } = require("./controllers/equipos");
const User = require("./controllers/login.js");
const authMiddleware = require("./middlewares/authorization.js");

app.post("/login", User.login);

app.get("/equipos", authMiddleware, obtenerEquipos);
app.post("/equipos", authMiddleware, agregarEquipo);

app.get("/equipos/:teamID/jugadores", authMiddleware, obtenerJugadores);
app.post("/equipos/:teamID/jugadores", authMiddleware, registrarJugador);

module.exports = app;
