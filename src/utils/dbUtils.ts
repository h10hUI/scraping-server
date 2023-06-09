import { db } from '../../db/db';
import { ScrapeResult } from '../types/types';

export const saveResultToDb = (results: ScrapeResult[]): void => {
  const stmt = db.prepare('INSERT INTO results(title, url) VALUES (?, ?)');

  results.forEach((result) => {
    stmt.run(result.title, result.url, (err: any) => {
      if (err) {
        console.error(err.message);
      }
    });
  });

  stmt.finalize();
};
