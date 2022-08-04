const CustomAPI = require("../errors/customAPIError");
const { StatusCodes } = require("http-status-codes");

class Unauthorize extends CustomAPI {
  constructor(message) {
    super(message);

    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthorize;