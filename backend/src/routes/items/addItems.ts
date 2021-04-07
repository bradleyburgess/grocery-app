import express from "express";
import { IExpressReqWithUser } from "src/types";
import db from "../../utils/db";

export default async function (
  req: IExpressReqWithUser,
  res: express.Response
): Promise<void> {
  const { userId } = req;
  const { name, groceryListId } = req.body;

  try {
    await db("groceryListItems").insert({
      userId,
      name,
      groceryListId,
      checked: "false",
    });
    res.json({ msg: "Item added successfully" });
  } catch (error) {
    console.log(error);
  }
}
