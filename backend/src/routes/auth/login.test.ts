import { setupTestDb } from "../../utils/db";
import supertest from "supertest";
import app from "../../server";
import { dummyData } from "../../utils/db";

const request = supertest(app);

describe("/api/auth/login route", () => {
  test("login successfully", async () => {
    const testUser = { email: "mock@test.com", password: "1UjhNi87$dhj" };
    await setupTestDb({ newReg: true });
    await request.post("/api/auth/register").send(testUser);
    const response = await request.post("/api/auth/login").send(testUser);
    expect(Object.keys(response.body)).toContain("token");
  });

  test("failed login with wrong password", async () => {
    const testUser = { email: dummyData.users.email, password: "1UjhNi87$dhj" };
    await setupTestDb({ newReg: true });
    await request.post("/api/auth/register").send(testUser);
    const response = await request
      .post("/api/auth/login")
      .send(Object.assign(testUser, { password: "wrongpassword" }));
    expect(response.body.errors[0].msg).toBe("Invalid credentials.");
    expect(Object.keys(response.body)).not.toContain("token");
  });
});
