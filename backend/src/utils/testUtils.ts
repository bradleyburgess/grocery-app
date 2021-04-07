import { Response, Request } from "express";

export const mockRequest = (
  options?: IMockRequestOptions
): Partial<IMockExpressReq> => {
  const req: Partial<IMockExpressReq> = {};
  req.userId = 1;
  if (options?.newReg) req.newRegistrations = true;
  if (options?.body) req.body = options.body;
  return req;
};

export const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

interface IMockRequestOptions {
  newReg?: boolean;
  body?: Record<string, unknown>;
}

interface IMockExpressReq extends Request {
  newRegistrations?: boolean;
  userId?: number;
}
