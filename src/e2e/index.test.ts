import request from "supertest";
import { createApp } from "../createApp";
import { type Express } from "express-serve-static-core";

describe("/api/test", () => {
  let app: Express;
  beforeAll(async () => {
    app = createApp();
  });

  it("should return a list of buckets", async () => {
    const response = await request(app).get("/api/supertest");
    expect(response.body).toStrictEqual([]);
  });
});
