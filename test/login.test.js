import mongoose from "mongoose";
import request from "supertest";
import dotenv from "dotenv";
dotenv.config();
import app from "../app.js";
import { userControllers } from "../controllers/auth.js";

const { DB_URI } = process.env;

const ENDPOINT = "/users/login";
const TEST_USER = {
  email: "test@test.ua",
  password: "test@test.ua",
};

describe("test login controller", () => {
  beforeAll(async () => {
    await mongoose.connect(DB_URI);
  });
  afterAll(async () => {
    await mongoose.disconnect(DB_URI);
  });

  test("login controller returns status code 200", async () => {
    const response = await request(app).post(ENDPOINT).send(TEST_USER);
    expect(response.status).toBe(200);
  });
  test("login controller returns token", async () => {
    const response = await request(app).post(ENDPOINT).send(TEST_USER);
    expect(response.body.token).toBeDefined();
  });
  test("login controller returns object user with 2 fields: email and subscription with typeof string", async () => {
    const response = await request(app).post(ENDPOINT).send(TEST_USER);

    expect(response).toBeDefined();
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.user).toMatchObject({
      email: expect.any(String),
      subscription: expect.any(String),
    });
  });

  test("login controller whith incorrect password returns status code 401", async () => {
    const response = await request(app).post(ENDPOINT).send({
      email: "test@test.ua",
      password: "test@test.ua123",
    });
    expect(response.status).toBe(401);
  });

  test("login controller whith incorrect email returns status code 401", async () => {
    const response = await request(app).post(ENDPOINT).send({
      email: "test123@test.ua",
      password: "test@test.ua",
    });
    expect(response.status).toBe(401);
  });

  test("login controller whith null email and password returns status code 400", async () => {
    const response = await request(app).post(ENDPOINT).send({
      email: "",
      password: "",
    });
    expect(response.status).toBe(400);
  });
});
