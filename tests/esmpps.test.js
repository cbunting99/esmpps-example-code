/**
 * @file Unit tests for ESMPPS calculations
 * @copyright Chris Bunting 2023
 * @license MIT
 */

import request from "supertest";
import app from "../src/index.js";
import db from "../src/database/db.js";

describe("ESMPPS API", () => {
  beforeAll(async () => {
    // Initialize test database
    await db.exec("DELETE FROM shares");
    await db.exec("DELETE FROM miners");
  });

  it("should calculate payouts correctly", async () => {
    const response = await request(app)
      .post("/api/v1/payouts/calculate")
      .send({
        poolEarnings: 100,
        shares: [
          { miner: "Alice", shares: 50 },
          { miner: "Bob", shares: 30 },
          { miner: "Charlie", shares: 20 },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.payouts).toEqual([
      expect.objectContaining({
        miner: "Alice",
        shares: 50,
        payout: 50,
      }),
      expect.objectContaining({
        miner: "Bob",
        shares: 30,
        payout: 30,
      }),
      expect.objectContaining({
        miner: "Charlie",
        shares: 20,
        payout: 20,
      }),
    ]);
  });

  // Add more test cases...
});
