import { Response, NextFunction } from "express";
import { IExpressReqToken } from "src/types";
import jwt from "jsonwebtoken";
import checkToken from "./checkToken";

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (input?: Partial<IExpressReqToken>) => {
  const req: Partial<IExpressReqToken> = {
    headers: {
      token: "",
    },
    ...input,
  };
  return req;
};

describe("Check Token middleware", () => {
  test("unauthorized without token", () => {
    const mockReq = mockRequest();
    const mockRes = mockResponse();
    const mockNext = jest.fn();
    checkToken(mockReq as IExpressReqToken, mockRes as Response, mockNext);
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ msg: "Unauthorized" }],
    });
  });

  test("unauthorized with invalid token", () => {
    const mockToken = jwt.sign(
      { email: "mock@test.com", userId: "mockUser" },
      process.env.JWT_SECRET
    );
    const fakeToken = mockToken.replace(/e/, "E");
    const mockReq = mockRequest({ headers: { token: fakeToken } });
    const mockRes = mockResponse();
    const mockNext = jest.fn();
    checkToken(
      mockReq as IExpressReqToken,
      mockRes as Response,
      mockNext as NextFunction
    );
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ msg: "Invalid token" }],
    });
  });

  test("calls next() with valid token", () => {
    const mockToken = jwt.sign(
      { email: "mock@test.com", userId: "mockUser" },
      process.env.JWT_SECRET
    );
    const mockReq = mockRequest({ headers: { token: mockToken } });
    const mockRes = mockResponse();
    const mockNext = jest.fn();
    checkToken(
      mockReq as IExpressReqToken,
      mockRes as Response,
      mockNext as NextFunction
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
