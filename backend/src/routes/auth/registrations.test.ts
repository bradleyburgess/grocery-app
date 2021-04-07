import { Response } from "express";
import { IExpressReqAuthRoute } from "src/types";
import { setupTestDb } from "../../utils/db";
import { mockRequest, mockResponse } from "../../utils/testUtils";
import checkRegistration from "./registrations";

describe("Check Registrations", () => {
  test("returns true", async () => {
    await setupTestDb({ newReg: true });
    const mockReq = mockRequest();
    const mockRes = mockResponse();

    await checkRegistration(
      mockReq as IExpressReqAuthRoute,
      mockRes as Response
    );
    expect(mockRes.json).toHaveBeenCalledWith({ value: true });
  });

  test("returns false", async () => {
    await setupTestDb({ newReg: false });
    const mockReq = mockRequest();
    const mockRes = mockResponse();

    await checkRegistration(
      mockReq as IExpressReqAuthRoute,
      mockRes as Response
    );
    expect(mockRes.json).toHaveBeenCalledWith({ value: false });
  });
});
