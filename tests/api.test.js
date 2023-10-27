import supertest from "supertest";
import app from "../index.js";

describe("Login API endpoint", () => {
  it("should return a token with credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "admin@gmail.com", password: "12345678" });

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.message).toBe("Login successful");
    expect(response.body.token).toBeDefined();
  });

  it("should return an error response with invalid credentials", async () => {
    const response = await request(app)
      .post("/login")
      .send({ email: "admin@gmail.com", password: "12345678" });

    expect(response.status).toBe(401);
    expect(response.body).toBeDefined();
    expect(response.body.message).toBe("Invalid credentials");
    expect(response.body.token).toBeUndefined();
  });
});
