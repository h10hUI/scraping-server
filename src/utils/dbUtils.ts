import { db } from '../../db/db';
import { ScrapeResult } from '../types/types';

export const saveResultToDb = (results: ScrapeResult[]): void => {
  // 重複チェックを行って、url が重複していたら、db に保存しない
  // 重複していなかったら、db に保存する
  results.forEach((result) => {
    const { url, title } = result;
    const sql = 'SELECT * FROM results WHERE url = ?';

    db.get(sql, [url], (err, row) => {
      if (err) {
        console.error(err.message);
      }

      if (!row) {
        const insert = 'INSERT INTO results (url, title) VALUES (?, ?)';
        db.run(insert, [url, title], (err) => {
          if (err) {
            console.error(err.message);
          }
        });
      }
    });
  });
};
