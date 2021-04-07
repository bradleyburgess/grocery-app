import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../utils/db";

export default async function (
  req: express.Request,
  res: express.Response
): Promise<void | express.Response> {
  const { email, password } = req.body;
  const foundUser = await db
    .select("*")
    .from("users")
    .where("email", "=", email)
    .first();

  if (!foundUser)
    return res.status(401).json({ errors: [{ msg: "Invalid credentials." }] });
  const passwordMatch = await bcrypt.compare(password, foundUser.password);

  if (!passwordMatch)
    return res.status(401).json({ errors: [{ msg: "Invalid credentials." }] });

  const userId = foundUser.id;

  const token = jwt.sign({ email, userId }, process.env.JWT_SECRET);

  return res.status(200).json({ token });
}
