import { mockRequest, mockResponse } from "../../utils/testUtils";
import { Response } from "express";
import { IExpressReqWithUser } from "src/types";
import { setupTestDb, dummyData, formatGetItems } from "../../utils/db";
import getItemsRoute from "./getItems";

describe("/api/auth/items get items", () => {
  test("gets items", async () => {
    const expectedResponse = {
      data: formatGetItems(dummyData.groceryLists, dummyData.groceryListItems),
    };

    await setupTestDb({ newReg: true });
    const mockReq = mockRequest({ newReg: true });
    const mockRes = mockResponse();

    await getItemsRoute(mockReq as IExpressReqWithUser, mockRes as Response);

    expect(mockRes.json).toHaveBeenCalledWith(expectedResponse);
  });
});
