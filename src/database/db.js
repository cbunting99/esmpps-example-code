/**
 * @file Database initialization and connection
 * @copyright Chris Bunting 2023
 * @license MIT
 */

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import config from 'config';
import logger from '../utils/logger.js';

const databaseConfig = {
  filename: config.get('database.file'),
  driver: sqlite3.Database,
};

const createTables = async (db) => {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS miners (
      id TEXT PRIMARY KEY,
      balance REAL DEFAULT 0,
      total_shares REAL DEFAULT 0,
      total_payouts REAL DEFAULT 0
    );
    
    CREATE TABLE IF NOT EXISTS shares (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      miner_id TEXT,
      shares REAL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(miner_id) REFERENCES miners(id)
    );
  `);
};

async function initializeDatabase() {
  try {
    const db = await open(databaseConfig);
    await createTables(db);
    logger.info('Database initialized successfully');
    return db;
  } catch (error) {
    logger.error(`Database initialization failed: ${error.message}`);
    throw error;
  }
}

export default initializeDatabase();
