import { mockResponse } from "../../utils/testUtils";
import { Response } from "express";
import app from "../../server";
import supertest from "supertest";
import { IExpressReqNewRegistration } from "src/types";
import registerRoute from "./register";
import { setupTestDb } from "../../utils/db";
import { dummyData } from "../../utils/db";

const request = supertest(app);

const mockRequest = (
  newReg: boolean,
  body?: { email?: string; password?: string }
) => {
  const req: Partial<IExpressReqNewRegistration> = {};
  req.newRegistrations = newReg;
  if (body) req.body = body;
  return req;
};

describe("/api/auth/register route", () => {
  test("disallows new registrations", () => {
    const mockReq = mockRequest(false);
    const mockRes = mockResponse();
    registerRoute(mockReq as IExpressReqNewRegistration, mockRes as Response);
    expect(mockRes.json).toHaveBeenCalledWith({
      errors: [{ msg: "Not accepting new registrations." }],
    });
  });

  test("fails with invalid email", async () => {
    const db = await setupTestDb({ newReg: true });
    const testUser = { email: "invalidemail", password: "1gU7%fjkKSiw" };
    const response = await request.post("/api/auth/register").send(testUser);
    const dbNewRegs = await db
      .select("value")
      .from("system")
      .where("key", "NEW_REGISTRATIONS")
      .first();
    expect(parseInt(dbNewRegs.value)).toBe(1);
    expect(response.body.errors[0].param).toBe("email");
  });

  test("fails with weak password", async () => {
    const testUser = { email: "mock@test.com", password: "testing123456" };
    await setupTestDb({ newReg: true });
    const response = await request.post("/api/auth/register").send(testUser);
    expect(response.body.errors[0].param).toBe("password");
  });

  test("registers a user successully", async () => {
    const testUser = { email: "mock@test.com", password: "1gU7%fjkKSiw" };
    const db = await setupTestDb({ newReg: true });
    const response = await request.post("/api/auth/register").send(testUser);
    expect(response.body.errors).toBeUndefined();
    expect(response.body.msg).toBe("User created successfully");
    const dbResult = await db
      .select("*")
      .from("users")
      .where("email", testUser.email)
      .first();
    expect(dbResult.email).toBe(testUser.email);
  });

  test("rejects a duplicate user", async () => {
    const testUser = {
      email: dummyData.users.email,
      password: dummyData.users.password,
    };
    const db = await setupTestDb({ newReg: true });
    const response = await request.post("/api/auth/register").send(testUser);
    expect(response.body.errors[0].msg).toBe("User already exists.");
    const dbResult = await db
      .select("*")
      .from("users")
      .where("email", testUser.email);
    expect(dbResult.length).toBe(1);
  });
});
