const { getPlayers, addPlayer } = require("../db/consultas");
const errorHandler = require("../middlewares/errors");
const authMiddleware = require("../middlewares/authorization");

const obtenerJugadores = async (req, res) => {
  try {
    const { teamID } = req.params;
    const jugadores = await getPlayers(teamID);
    res.json(jugadores);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const registrarJugador = async (req, res) => {
  try {
    const { teamID } = req.params;
    const jugador = req.body;
    await addPlayer({ jugador, teamID });
    res.status(201).json({ message: "Jugador agregado con éxito" });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports = { obtenerJugadores, registrarJugador };
