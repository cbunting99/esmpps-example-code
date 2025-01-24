/**
 * @file API Controller for ESMPPS calculations
 * @copyright Chris Bunting 2023
 * @license MIT
 */

import { calculateESMPPS } from '../services/esmppsService.js';
import logger from '../utils/logger.js';

async function handlePayoutCalculation(req, res) {
  try {
    const { poolEarnings, shares } = req.body;
    const result = await calculateESMPPS(poolEarnings, shares);
    
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    logger.error(`API Error: ${error.message}`);
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
}

export default {
  calculatePayout: handlePayoutCalculation,
};
