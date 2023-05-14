import { preHandlerHookHandler } from "fastify";
import jwt from "jsonwebtoken";
// Middleware to authenticate the JWT

export const authenticateToken: preHandlerHookHandler = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.trim()
  console.log(authHeader)
  if (token == null) {
    return res.send(401);
  }
  if (!process.env.JWT_SECRET) {
    console.log("JWT_SECRET not found in authenticateToken middleware");
    next();
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (err: any, user: any) => {
    console.log(err)
    if (err) {
      return res.send(403);
    }
    console.log(user)
    //@ts-ignore
    req.user = user;
    next();
  });
};
