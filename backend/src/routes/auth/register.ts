import express from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import { IExpressReqAuthRoute } from "src/types";
import db from "../../utils/db";

export default async function (
  req: IExpressReqAuthRoute,
  res: express.Response
): Promise<void | express.Response> {
  if (req.newRegistrations === false) {
    return res
      .status(401)
      .json({ errors: [{ msg: "Not accepting new registrations." }] });
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  try {
    await db("users").insert({ email, password: hashedPass });
    res.status(200).json({ msg: "User created successfully", email });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT") {
      res
        .status(401)
        .json({ errors: [{ msg: "User already exists.", location: "email" }] });
    } else {
      res.status(500).json({ errors: [{ msg: "Internal server error." }] });
    }
  }
}
