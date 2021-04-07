import express from "express";
import jwt from "jsonwebtoken";
import { IExpressReqToken, IJWTToken } from "src/types";

export default function checkToken(
  req: IExpressReqToken,
  res: express.Response,
  next: express.NextFunction
): void | express.Response {
  const token = req.headers.token;
  if (!token)
    return res.status(401).json({ errors: [{ msg: "Unauthorized" }] });
  try {
    const decryptedToken = jwt.verify(
      token as string,
      process.env.JWT_SECRET
    ) as IJWTToken;
    req.email = decryptedToken.email;
    req.userId = decryptedToken.userId;
    next();
  } catch (error) {
    if (error.message === "invalid token")
      return res.status(401).json({ errors: [{ msg: "Invalid token" }] });
    console.log(error);
  }
}
