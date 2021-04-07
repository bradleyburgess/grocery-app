import express from "express";
import { IExpressReqWithUser } from "src/types";
import db from "../../utils/db";

export default async function (
  req: IExpressReqWithUser,
  res: express.Response
): Promise<void> {
  const { userId } = req;
  const { id } = req.body;

  try {
    await db("groceryListItems").where({ id, userId }).delete();
    res.json({ msg: "Item deleted successfully" });
  } catch (error) {
    console.log(error);
  }
}
