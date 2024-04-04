const request = require("supertest");
const server = require("../index.js");
//--Como se utiliza unmiddleware para gestionar la validacion de un token en el archivo index.js
//--el manejo del token para autorizar operaciones se independiza de la funcion que gestiona la peticion en nuestro controller
//-- por ende se simula un token valido  y se utiliza el fromato de envio de header para su funcionamiento
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzEyMTgzODA3fQ.5BzRhbblCOEOzTy6CG9ETnTF-aW8mkwv7lliy7MV_YQ";

describe("Testeo de operaciones CRUD, rutas equipos/jugadores/login", () => {
  //----------------Testeando la ruta login petición POST
  it("Verificar la existencia de token y el status 200 y 400 en la ruta /login, peticion POST", async () => {
    const bodyReq = {
      username: "admin",
      password: "1234",
    };

    const response = await request(server).post("/login").send(bodyReq);

    expect(response.statusCode).toBe(200);

    // Aquí utilizamos el matcher toBeDefined(),
    //para verificar si un valor es definido o no es undefined
    expect(response.body.token).toBeDefined();
  });

  it("Verificar si statusCode es 400 en la ruta /login, peticion POST", async () => {
    const bodyReqBad = {
      username: "ronaldo",
      password: "5555",
    };
    const response = await request(server).post("/login").send(bodyReqBad);
    //-- El desafio dice que la respuesta debe ser un code 400 del grupo 400
    //-- el mas acertado al no conseguir las credenciales correctas es 404 NOT FOUND
    expect(response.status).toBe(404);
  });

  //----------------Testeando la ruta /equipos petición GET
  it("Verificar el status de la peticion GET ruta /equipos ", async () => {
    const response = await request(server)
      .get("/equipos")
      .set("Authorization", `Bearer ${token}`)
      .send();

    // console.log(response.request.header);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.statusCode).toBe(200);
    expect(response.request.header).toBeDefined();
  });

  //----------------Testeando la ruta /equipos/:teamID/jugadores petición POST
  it("Obtener statusCode 201 al ingresar jugadores a un equipo", async () => {
    const teamID = 2;
    const playerTest = {
      name: "Warren Zaire-Emery",
      position: 2,
    };
    const response = await request(server)
      .post(`/equipos/${teamID}/jugadores`)
      .set("Authorization", `Bearer ${token}`)
      .send(playerTest);

    expect(response.statusCode).toBe(201);
  });
});
