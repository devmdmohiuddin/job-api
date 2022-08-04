const CustomAPI = require("../errors/customAPIError");
const { StatusCodes } = require("http-status-codes");

class BadRequest extends CustomAPI {
  constructor(message) {
    super(message);

    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequest;
