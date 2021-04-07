import { mockRequest, mockResponse } from "../../utils/testUtils";
import { Response } from "express";
import { IExpressReqToken, IGroceryListItem } from "src/types";
import addItemsRoute from "./addItems";
import { setupTestDb } from "../../utils/db";

describe("/api/auth/items add items", () => {
  test("it successfully adds an item", async () => {
    const newItem: Partial<IGroceryListItem> = {
      name: "Jest Test Item",
      userId: 1,
      groceryListId: 1,
    };
    const db = await setupTestDb({ newReg: true });
    const mockReq = mockRequest({ body: newItem });
    const mockRes = mockResponse();

    await addItemsRoute(mockReq as IExpressReqToken, mockRes as Response);
    const dbResponse = await db
      .select("*")
      .from("groceryListItems")
      .where("name", newItem.name)
      .first();
    expect(mockRes.json).toHaveBeenCalledWith({
      msg: "Item added successfully",
    });
    expect(dbResponse.name).toBe(newItem.name);
  });
});
