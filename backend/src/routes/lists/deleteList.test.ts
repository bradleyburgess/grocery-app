import { Response } from "express";
import { mockRequest, mockResponse } from "../../utils/testUtils";
import { setupTestDb } from "../../utils/db";
import deleteListRoute from "./deleteList";
import { IExpressReqToken } from "src/types";

describe("delete list", () => {
  test("delete a lists", async () => {
    const db = await setupTestDb({ newReg: true });
    const origLists = await db.select("*").from("groceryLists");
    const lastList = origLists[origLists.length - 1];

    const mockReq = mockRequest({
      newReg: true,
      body: { id: lastList.id },
    });
    const mockRes = mockResponse();

    await deleteListRoute(mockReq as IExpressReqToken, mockRes as Response);

    const newLists = await db.select("*").from("groceryLists");

    expect(mockRes.json).toHaveBeenCalledWith({
      msg: "List deleted successfully",
    });
    expect(newLists.length).toBe(origLists.length - 1);
  });
});
