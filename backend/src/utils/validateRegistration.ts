import express from "express";
import { body } from "express-validator";

export default function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void {
  body("email").isEmail();
  body("password").isString();
  next();
}
