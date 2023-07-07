import sqlite3 from 'sqlite3'
import { logger } from '../src/middleware/logging'

export const db = new sqlite3.Database('./db/database.sqlite3', (err) => {
  if (err) {
    logger.error(err.message)
  }
  logger.info('Connected to the database.')

  db.run(
    `CREATE TABLE IF NOT EXISTS results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,
    (err) => {
      if (err) {
        logger.error(err.message)
      }
      logger.info('Created or find the result table.')
    }
  )
})
