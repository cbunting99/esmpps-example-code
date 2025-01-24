import { calculateSMPPS } from "./smpps.js";

// Example usage
const poolEarnings = 100; // Total pool earnings
const shares = [
  { miner: "Alice", shares: 50 },
  { miner: "Bob", shares: 30 },
  { miner: "Charlie", shares: 20 },
];

const payouts = calculateSMPPS(poolEarnings, shares);
console.log("SMPPS Payouts:");
console.log(payouts);
