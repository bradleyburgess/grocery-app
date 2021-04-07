import express from "express";
import { IExpressReqWithUser } from "src/types";
import db from "../../utils/db";

export default async function (
  req: IExpressReqWithUser,
  res: express.Response
): Promise<void> {
  const { userId } = req;

  try {
    const lists = await db
      .select("*")
      .from("groceryLists")
      .where("userId", userId);
    res.json(lists);
  } catch (error) {
    console.log(error);
  }
}
