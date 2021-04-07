import { Response } from "express";
import { mockRequest, mockResponse } from "../../utils/testUtils";
import deleteItemsRoute from "./deleteItems";
import { setupTestDb } from "../../utils/db";
import { IExpressReqToken } from "src/types";
import { dummyData } from "../../utils/db/dummyData";

describe("Delete Items Route", () => {
  test("delete one item", async () => {
    const db = await setupTestDb({ newReg: true });
    const mockReq = mockRequest({ body: { id: 1 } });
    const mockRes = mockResponse();

    await deleteItemsRoute(mockReq as IExpressReqToken, mockRes as Response);
    const dbResponse = await db
      .select("*")
      .from("groceryListItems")
      .where("id", dummyData.groceryListItems[0].id)
      .first();

    expect(mockRes.json).toHaveBeenCalledWith({
      msg: "Item deleted successfully",
    });
    expect(dbResponse).toBeUndefined();
  });
});
