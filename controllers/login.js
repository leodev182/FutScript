const jwt = require("jsonwebtoken");
const { secretKey } = require("../utils/utils.js");
const errorHandler = require("../middlewares/errors.js");
const { loginQuery } = require("../db/consultas.js");

class UserLogin {
  constructor() {}

  async login(req, res) {
    try {
      const { username } = req.body;
      await loginQuery(req.body);
      const token = jwt.sign({ username }, secretKey);
      res.status(200).json({ token });
    } catch (error) {
      errorHandler(error, req, res);
    }
  }
}
module.exports = new UserLogin();
