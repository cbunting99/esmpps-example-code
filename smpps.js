/**
 * @file Core SMPPS calculation logic
 * @copyright Chris Bunting 2023
 * @license MIT
 *
 * Contains the main SMPPS algorithm implementation including:
 * - Share calculation
 * - Payout distribution
 * - Input validation
 */

export function calculateSMPPS(poolEarnings, shares) {
  // Calculate total shares
  const totalShares = shares.reduce((sum, miner) => sum + miner.shares, 0);

  // Calculate maximum possible payout per share
  const maxPayoutPerShare = poolEarnings / totalShares;

  // Calculate payouts
  const payouts = shares.map((miner) => ({
    miner: miner.miner,
    payout: miner.shares * maxPayoutPerShare,
  }));

  return payouts;
}
