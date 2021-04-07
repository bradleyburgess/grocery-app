import { Response } from "express";
import { mockRequest, mockResponse } from "../../utils/testUtils";
import { setupTestDb } from "../../utils/db";
import getListsRoute from "./getLists";
import { IExpressReqToken } from "src/types";
import { dummyData } from "../../utils/db";

describe("getLists", () => {
  test("get the lists", async () => {
    const mockReq = mockRequest({ newReg: true });
    const mockRes = mockResponse();
    await setupTestDb({ newReg: true });

    const expectedResponse = dummyData.groceryLists;

    await getListsRoute(mockReq as IExpressReqToken, mockRes as Response);
    expect(mockRes.json).toHaveBeenCalledWith(expectedResponse);
  });
});
