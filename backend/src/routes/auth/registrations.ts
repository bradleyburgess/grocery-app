import express from "express";
import { IExpressReqAuthRoute } from "src/types";
import db from "../../utils/db";

export default async function (
  _: IExpressReqAuthRoute,
  res: express.Response
): Promise<void> {
  const result = await db
    .select("value")
    .from("system")
    .where("key", "NEW_REGISTRATIONS")
    .first();
  result.value = Boolean(parseInt(result.value));
  res.json(result);
}
