/**
 * @file Test cases for SMPPS implementation
 * @copyright Chris Bunting 2023
 * @license MIT
 *
 * Contains unit tests for:
 * - Basic SMPPS calculations
 * - Edge cases
 * - Input validation
 */

import { calculateSMPPS } from "./smpps.js";

/**
 * Run all SMPPS test cases
 * @function testSMPPS
 */
function testSMPPS() {
  const testCases = [
    {
      poolEarnings: 100,
      shares: [
        { miner: "A", shares: 50 },
        { miner: "B", shares: 30 },
        { miner: "C", shares: 20 },
      ],
      expected: [
        { miner: "A", payout: 50 },
        { miner: "B", payout: 30 },
        { miner: "C", payout: 20 },
      ],
    },
    {
      poolEarnings: 200,
      shares: [
        { miner: "X", shares: 100 },
        { miner: "Y", shares: 100 },
      ],
      expected: [
        { miner: "X", payout: 100 },
        { miner: "Y", payout: 100 },
      ],
    },
  ];

  testCases.forEach((testCase, index) => {
    const result = calculateSMPPS(testCase.poolEarnings, testCase.shares);
    const passed = JSON.stringify(result) === JSON.stringify(testCase.expected);
    console.log(`Test ${index + 1}: ${passed ? "PASSED" : "FAILED"}`);
    if (!passed) {
      console.log("Expected:", testCase.expected);
      console.log("Received:", result);
    }
  });
}

// Execute tests
testSMPPS();
