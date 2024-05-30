import jwt from "jsonwebtoken";
import sendResponse from "../lib/responseHelper.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return sendResponse(res, 401, "Not Authenticated ! ");

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err) return sendResponse(res, 403, "Token is not valid");
    req.userId = payload.id;
    next();
  });
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];

  // if (!token) {
  //   return res
  //     .status(401)
  //     .json({ message: "Access token is missing or invalid" });
  // }

  // jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
  //   if (err) {
  //     return res.status(403).json({ message: "Invalid token" });
  //   }
  //   req.userId = payload.id;
  //   next();
  // });
};
