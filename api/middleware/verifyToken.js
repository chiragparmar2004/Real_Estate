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
};
