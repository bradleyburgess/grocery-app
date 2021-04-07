import express from "express";
import { IExpressReqWithUser } from "src/types";
import db from "../../utils/db";

export default async function (
  req: IExpressReqWithUser,
  res: express.Response
): Promise<void> {
  const { userId } = req;
  const { name } = req.body;

  try {
    await db("groceryLists").insert({ userId, name });
    res.json({ msg: "List created successfully" });
  } catch (error) {
    console.log(error);
  }
}
