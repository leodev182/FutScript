const { getTeams, addTeam } = require("../db/consultas");
const errorHandler = require("../middlewares/errors.js");
const authMiddleware = require("../middlewares/authorization.js");

const obtenerEquipos = async (req, res) => {
  try {
    const teams = req.body;
    const equipos = await getTeams(teams);
    res.json(equipos);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

const agregarEquipo = async (req, res) => {
  try {
    const { name: equipo } = req.body;
    await addTeam(equipo);
    res.send({ message: "Equipo agregado con éxito" });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

module.exports = { obtenerEquipos, agregarEquipo };
