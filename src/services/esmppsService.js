/**
 * @file ESMPPS calculation service
 * @copyright Chris Bunting 2023
 * @license MIT
 */

import Joi from 'joi';
import logger from '../utils/logger.js';
import db from '../database/db.js';

const payoutSchema = Joi.object({
  poolEarnings: Joi.number().positive().required(),
  shares: Joi.array().items(
    Joi.object({
      miner: Joi.string().required(),
      shares: Joi.number().positive().required(),
    }),
  ).min(1).required(),
});

async function getMinerRecord(minerId) {
  return db.get(
    'SELECT * FROM miners WHERE id = ?',
    [minerId],
  ) || {
    id: minerId,
    balance: 0,
    totalShares: 0,
    totalPayouts: 0,
  };
}

async function updateMinerRecord(minerId, newBalance, shares) {
  return db.run(
    `INSERT OR REPLACE INTO miners 
    (id, balance, total_shares, total_payouts)
    VALUES (?, ?, ?, ?)`,
    [minerId, newBalance, shares, 0],
  );
}

async function recordShares(minerId, shares) {
  return db.run(
    'INSERT INTO shares (miner_id, shares) VALUES (?, ?)',
    [minerId, shares],
  );
}

export async function calculateESMPPS(poolEarnings, shares) {
  const { error } = payoutSchema.validate({ poolEarnings, shares });
  if (error) {
    logger.error(`Validation error: ${error.message}`);
    throw new Error(`Invalid input: ${error.message}`);
  }

  try {
    const totalShares = shares.reduce((sum, miner) => sum + miner.shares, 0);
    const maxPayoutPerShare = poolEarnings / totalShares;

    const payouts = await Promise.all(shares.map(async (miner) => {
      const minerRecord = await getMinerRecord(miner.miner);
      const sharesValue = miner.shares * maxPayoutPerShare;
      const newBalance = minerRecord.balance + sharesValue;

      await updateMinerRecord(miner.miner, newBalance, miner.shares);
      await recordShares(miner.miner, miner.shares);

      return {
        miner: miner.miner,
        shares: miner.shares,
        payout: sharesValue,
        balance: newBalance,
      };
    }));

    logger.info('ESMPPS calculation completed successfully');
    return {
      totalShares,
      maxPayoutPerShare,
      payouts,
    };
  } catch (error) {
    logger.error(`ESMPPS calculation failed: ${error.message}`);
    throw new Error('Failed to calculate ESMPPS payouts');
  }
}
