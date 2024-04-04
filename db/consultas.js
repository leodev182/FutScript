const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const format = require("pg-format");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "welys182",
  database: "futscript",
  allowExitOnIdle: true,
});

const getTeams = async () => {
  const { rows } = await pool.query("SELECT * FROM equipos");
  if (!rows) {
    throw {
      code: 500,
      message: "No se obtuvieron equipos de la base de datos.",
    };
  }
  return rows;
};

const getPlayers = async (teamID) => {
  const consulta = format(
    `
    SELECT j.name, p.name AS posicion
    FROM jugadores j
    INNER JOIN posiciones p ON j.position = p.id
    WHERE j.id_equipo = %L ORDER BY p.name ASC
  `,
    teamID
  );

  const { rows } = await pool.query(consulta);

  if (!rows || rows.length === 0) {
    throw {
      code: 404,
      error: "No se encontraron jugadores para el equipo especificado",
    };
  }
  return rows;
};

const addTeam = async (equipo) => {
  const consulta = "INSERT INTO equipos VALUES (DEFAULT, $1)";
  const { rowCount } = await pool.query(consulta, [equipo]);
  if (!rowCount) {
    throw { code: 401, message: "El equipo ya está registrado" };
  }
  return rowCount;
};

const addPlayer = async ({ jugador, teamID }) => {
  const { name, position } = jugador;
  const consulta = `
    INSERT INTO jugadores (id, id_equipo, name, position)
    VALUES (DEFAULT, $1, $2, $3)
    RETURNING name `;
  const { rows } = await pool.query(consulta, [teamID, name, position]);
  if (!rows) {
    throw {
      code: 500,
      message: `El jugador ${rows} no pudo ser insertado`,
    };
  }
  return rows[0].name;
};

const loginQuery = async ({ username, password }) => {
  const consulta = "SELECT * FROM user_admin WHERE username = $1";
  const {
    rows: [usuario],
  } = await pool.query(consulta, [username]);
  // console.log(usuario);
  if (!usuario) {
    throw { message: "Usuario no encontrado", code: 404 };
  }
  const { password: encripted } = usuario;
  const passwordOk = bcrypt.compareSync(password, encripted);
  if (!passwordOk) {
    throw { message: "La contraseña no es correcta ", code: 404 };
  }
  return { message: `Usuario: (${usuario.username}) validado correctamente` };
};

module.exports = { getTeams, addTeam, getPlayers, addPlayer, loginQuery };
