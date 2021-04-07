import express from "express";
import { IExpressReqWithUser, IGroceryList, IGroceryListItem } from "src/types";
import db, { formatGetItems } from "../../utils/db";

export default async function (
  req: IExpressReqWithUser,
  res: express.Response
): Promise<void> {
  const { userId } = req;

  try {
    const lists: IGroceryList[] = await db
      .select("*")
      .from("groceryLists")
      .where("userId", "=", userId);

    const items: IGroceryListItem[] = await db
      .select("*")
      .from("groceryListItems")
      .where("userId", "=", userId);

    const data = formatGetItems(lists, items);

    res.json({ data });
  } catch (error) {
    console.log(error);
  }
}
