import request from "supertest";
import app, { connectDB } from "../app";
import { closeDatabase, clearDatabase } from "./dbSetup";

beforeAll(async () => {
  await connectDB();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

const registerUser = (email?: string, password?: string, username?: string) => {
  return request(app)
    .post("/api/v1/user/auth/register")
    .send({
      email: email ?? "admin@area.local",
      password: password ?? "password123",
      username: username ?? "admin",
    });
};

const login = (email: string, password: string) => {
  return request(app)
    .post("/api/v1/user/auth/login")
    .send({ email: email, password: password });
};

describe("POST /api/v1/user/auth/register", () => {
  it("should return a 201 status and a user info", async () => {
    const response = await registerUser();
    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.user.email).toBe("admin@area.local");
    expect(response.body.user.username).toBe("admin");
    expect(response.body.user.role).toBe("user");
  });

  it("should return a 201 status and a user info, second user is a normal user", async () => {
    await registerUser();
    const secondUser = await registerUser("user@admin.local", "pass123", "user2");
    expect(secondUser.status).toBe(201);
    expect(secondUser.body.status).toBe("success");
    expect(secondUser.body.user.email).toBe("user@admin.local");
    expect(secondUser.body.user.username).toBe("user2");
    expect(secondUser.body.user.role).toBe("user");
  });

  it("should return a 400 status with a localized 'Email, password, and username are required' message when email is missing", async () => {
    let response = await request(app)
      .post("/api/v1/user/auth/register")
      .send({
        password: "password123",
        username: "user",
        role: "user",
      });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Email, password, and username are required");

    response = await request(app)
      .post("/api/v1/user/auth/register")
      .send({
        email: "user@area.local",
        username: "user",
        role: "user",
      });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Email, password, and username are required");

    response = await request(app)
      .post("/api/v1/user/auth/register")
      .send({
        email: "user@area.local",
        password: "password123",
        role: "user",
      });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Email, password, and username are required");
  });

  it("should return a 400 status with a localized 'Password must be at least 6 characters' message when password is too short", async () => {
    const response = await request(app)
      .post("/api/v1/user/auth/register")
      .send({
        email: "user@area.local",
        password: "123",
        username: "user",
        role: "user",
      });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Password must be at least 6 characters");
  });

  it("should return a 409 status with a localized 'Email is already in use' message when email is already registered", async () => {
    await registerUser();

    const response = await request(app)
      .post("/api/v1/user/auth/register")
      .send({
        email: "admin@area.local",
        password: "password123",
        username: "admin",
        role: "user",
      });

    expect(response.status).toBe(409);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Email is already in use");
  });
});

describe("POST /api/v1/user/auth/login", () => {
  it("should return a 200 status and success message if the login is successful", async () => {
    await registerUser();

    const response = await login("admin@area.local", "password123");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Login successful");
    expect(response.body.tokens).toHaveProperty("access_token");
    expect(response.body.tokens).toHaveProperty("refresh_token");
  });

  it("should return a 401 status and a generic error message for invalid credentials", async () => {
    await registerUser();

    const response = await login("admin@area.local", "wrongpassword");
    expect(response.status).toBe(401);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Invalid email or password");
  });

  it("should return a 401 status and a generic error message if the email does not exist", async () => {
    await registerUser();

    const response = await login("nonexistent@area.local", "password123");
    expect(response.status).toBe(401);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Invalid email or password");
  });

  it("should return a 400 status and an error message if email or password is missing", async () => {
    await registerUser();

    const response = await login("", "password123");
    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Email and password are required");
  });
});

describe("User CRUD (Read, Update, Partial Delete) with TOTP Registration and Deletion", () => {
  let userToken: string;
  let userId: string;

  beforeEach(async () => {
    const response = await registerUser("user@area.local", "password123", "user1");
    userId = response.body.user.id;
    userToken = response.body.tokens.access_token;
  });

  afterEach(async () => {
    await clearDatabase();
  });

  it("should fetch the user information successfully", async () => {
    const response = await request(app)
      .get(`/api/v1/user/${userId}`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.user.email).toBe("user@area.local");
    expect(response.body.user.username).toBe("user1");
    expect(response.body.user.totp_enabled).toBe(false);
  });

  it("should update the user email and enable TOTP with a valid totp_secret", async () => {
    const response = await request(app)
      .patch(`/api/v1/user/${userId}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        email: "newemail@area.local",
        username: "newusername",
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.user.email).toBe("newemail@area.local");
    expect(response.body.user.username).toBe("newusername");
  });

  it("should update the user password", async () => {
    const response = await request(app)
      .patch(`/api/v1/user/${userId}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        password: "newpassword123",
      });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
  });

  it("should fail to disable TOTP if it is already disabled", async () => {
    const response = await request(app)
      .delete(`/api/v1/user/${userId}/totp`)
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("TOTP is already disabled");
  });

  it("should fail to fetch user data without authentication", async () => {
    const response = await request(app)
      .get(`/api/v1/user/${userId}`);

    expect(response.status).toBe(401);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Unauthorized");
  });

  it("should fail to update user without authentication", async () => {
    const response = await request(app)
      .patch(`/api/v1/user/${userId}`)
      .send({
        email: "newemail@area.local",
        username: "newusername",
      });

    expect(response.status).toBe(401);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Unauthorized");
  });

  it("should fail to disable TOTP without authentication", async () => {
    const response = await request(app)
      .delete(`/api/v1/user/${userId}/totp`);

    expect(response.status).toBe(401);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Unauthorized");
  });

  it("should fail to update the user password without authentication", async () => {
    const response = await request(app)
      .patch(`/api/v1/user/${userId}`)
      .send({
        password: "newpassword123",
      });

    expect(response.status).toBe(401);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Unauthorized");
  });

  it("should fail to update the user password with invalid data", async () => {
    const response = await request(app)
      .patch(`/api/v1/user/${userId}`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        password: "",
      });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Password must be at least 6 characters");
  });
});
