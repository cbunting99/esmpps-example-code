/**
 * @file SMPPS calculation service
 * @copyright Chris Bunting 2023
 * @license MIT
 *
 * Core business logic for SMPPS calculations including:
 * - Input validation
 * - Payout calculations
 * - Error handling
 */

import Joi from "joi";
import logger from "../utils/logger.js";

const payoutSchema = Joi.object({
  poolEarnings: Joi.number().positive().required(),
  shares: Joi.array()
    .items(
      Joi.object({
        miner: Joi.string().required(),
        shares: Joi.number().positive().required(),
      })
    )
    .min(1)
    .required(),
});

export function calculateSMPPS(poolEarnings, shares) {
  // Validate input
  const { error } = payoutSchema.validate({ poolEarnings, shares });
  if (error) {
    logger.error(`Validation error: ${error.message}`);
    throw new Error(`Invalid input: ${error.message}`);
  }

  try {
    const totalShares = shares.reduce((sum, miner) => sum + miner.shares, 0);
    const maxPayoutPerShare = poolEarnings / totalShares;

    const payouts = shares.map((miner) => ({
      miner: miner.miner,
      shares: miner.shares,
      payout: parseFloat((miner.shares * maxPayoutPerShare).toFixed(8)),
    }));

    logger.info("SMPPS calculation completed successfully");
    return {
      totalShares,
      maxPayoutPerShare,
      payouts,
    };
  } catch (error) {
    logger.error(`SMPPS calculation failed: ${error.message}`);
    throw new Error("Failed to calculate SMPPS payouts");
  }
}
