// TODO: authenticate / check that user can delete list

import express from "express";
import { IExpressReqWithUser } from "src/types";
import db from "../../utils/db";

export default async function (
  req: IExpressReqWithUser,
  res: express.Response
): Promise<void> {
  const { id } = req.body;

  try {
    // first delete all items in list
    await db("groceryListItems").where("groceryListId", id).delete();
    // then delete list
    await db("groceryLists").where("id", id).delete();

    res.json({ msg: "List deleted successfully" });
  } catch (error) {
    console.log(error);
  }
}
