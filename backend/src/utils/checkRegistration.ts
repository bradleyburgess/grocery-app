import express from "express";
import { IExpressReqNewRegistration } from "src/types";
import db from "./db";

export default async function checkRegistration(
  req: IExpressReqNewRegistration,
  _: express.Response,
  next: express.NextFunction
): Promise<void> {
  const result = await db
    .select("value")
    .from("system")
    .where("key", "NEW_REGISTRATIONS")
    .first();
  req.newRegistrations = Boolean(parseInt(result.value));
  next();
}
