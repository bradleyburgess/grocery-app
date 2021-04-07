import express from "express";
import { IExpressReqWithUser, IGroceryListItemChange } from "src/types";
import Stack from "../../utils/Stack";
import db from "../../utils/db";

export default async function (
  req: IExpressReqWithUser,
  res: express.Response
): Promise<void> {
  if (!Array.isArray(req.body)) {
    updateItem(req.body);
    res.json({ msg: "Item updated successfully!" });
  }
  if (Array.isArray(req.body)) {
    const stack = new Stack<IGroceryListItemChange>(req.body);
    while (!stack.isEmpty()) {
      updateItem(stack.pop());
    }
    res.json({ msg: "Items updated successfully!" });
  }
}

async function updateItem(item: IGroceryListItemChange) {
  await db("groceryListItems")
    .where("id", item.id)
    .update(item.updatedField, item.newValue);
}
