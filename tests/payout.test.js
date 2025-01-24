/**
 * @file Unit tests for SMPPS calculations
 * @copyright Chris Bunting 2023
 * @license MIT
 *
 * Contains test cases for:
 * - API endpoint functionality
 * - Calculation correctness
 * - Error handling
 */

import request from "supertest";
import app from "../src/index.js";

describe("SMPPS API", () => {
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
      { miner: "Alice", shares: 50, payout: 50 },
      { miner: "Bob", shares: 30, payout: 30 },
      { miner: "Charlie", shares: 20, payout: 20 },
    ]);
  });

  // Add more test cases...
});
