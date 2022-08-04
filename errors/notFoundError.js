const CustomAPI = require("../errors/customAPIError");
const { StatusCodes } = require("http-status-codes");

class NotFound extends CustomAPI {
  constructor(message) {
    super(message);

    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFound;