CREATE DATABASE futscript;
\c futscript;

CREATE TABLE equipos (id SERIAL PRIMARY KEY, name VARCHAR(250) NOT NULL);

CREATE TABLE posiciones (id SERIAL PRIMARY KEY, name VARCHAR(250) NOT NULL);

CREATE TABLE jugadores (id SERIAL PRIMARY KEY, id_equipo INT REFERENCES equipos(id), name VARCHAR(250), position INT REFERENCES posiciones(id));


INSERT INTO posiciones values
(DEFAULT, 'delantero'),
(DEFAULT, 'centrocampista'),
(DEFAULT, 'defensa'),
(DEFAULT, 'portero');


CREATE TABLE user_admin (
  id SERIAL NOT NULL,
  username VARCHAR(50) NOT NULL UNIQUE,
  password  VARCHAR(60) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO user_admin (username, password) VALUES ('admin', '$2a$10$uF743rxFIS0C8bQKScJqQ.42myK0S3BSH/sSweRRv4WJUH4OUICgy');
