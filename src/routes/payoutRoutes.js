/**
 * @file API Routes for ESMPPS endpoints
 * @copyright Chris Bunting 2023
 * @license MIT
 */

import express from 'express';
import rateLimit from 'express-rate-limit';
import config from 'config';
import payoutController from '../controllers/payoutController.js';

const router = express.Router();
const limiter = rateLimit({
  windowMs: config.get('server.rateLimit.windowMs'),
  max: config.get('server.rateLimit.max'),
});

router.post('/calculate', limiter, payoutController.calculatePayout);

export default router;
