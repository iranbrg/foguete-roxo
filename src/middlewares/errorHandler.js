import AppError from "../errors/AppError";

export default function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message
    });
  }

  console.error(err);

  res.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });
}
