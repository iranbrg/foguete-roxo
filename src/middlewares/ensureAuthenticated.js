import { verify } from "jsonwebtoken";
import jwtConfig from "../config/auth";
import AppError from "../errors/AppError";

export default function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const payload = verify(token, jwtConfig.jwt.secret);

    const { sub, name, email } = payload;

    req.user = {
      id: sub,
      name,
      email
    };

    next();
  } catch (err) {
    throw new AppError("Invalid JTW token", 401);
  }
}
