import { Response } from "express";
import { mockRequest, mockResponse } from "../../utils/testUtils";
import { setupTestDb } from "../../utils/db";
import addListRoute from "./addList";
import { IExpressReqToken, IGroceryList } from "src/types";

describe("getLists", () => {
  test("get the lists", async () => {
    const newList: Partial<IGroceryList> = {
      name: "Jest Test List",
      userId: 1,
    };

    const mockReq = mockRequest({ newReg: true, body: newList });
    const mockRes = mockResponse();
    const db = await setupTestDb({ newReg: true });

    await addListRoute(mockReq as IExpressReqToken, mockRes as Response);

    const dbResponse: IGroceryList = await db
      .select("*")
      .from("groceryLists")
      .where("name", newList.name)
      .first();

    const { id } = await db("groceryLists").max("id as id").first();

    const expectedDbResponse = { ...newList, id };

    expect(mockRes.json).toHaveBeenCalledWith({
      msg: "List created successfully",
    });
    expect(dbResponse).toEqual(expectedDbResponse);
  });
});
