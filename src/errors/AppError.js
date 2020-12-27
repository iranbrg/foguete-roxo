export default class AppError {
  constructor(message, statusCode = 400) {
    // Somehow make these properties readonly
    this.message = message;
    this.statusCode = statusCode;
  }
}
