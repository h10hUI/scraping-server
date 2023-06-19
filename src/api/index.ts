import express, { Request, Response } from 'express';
import { db } from '../../db/db';
import { ResultRow } from '../types/types';

const app = express();
const port = 3000;

// api/rusults を GET したときの処理
// ここで db からデータを取得して返す
// このとき、db から取得したデータは ResultRow[] 型になっている
// 結果は JSON で返す
app.get('/api/results/v1', async (req: Request, res: Response) => {
  db.all('SELECT * FROM results', (err, rows: ResultRow[]) => {
    if (err) {
      res.status(500).send({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 開発環境でのみ実行する console.log
if (process.env.NODE_ENV === 'development') {
  app.listen(port, () => {
    console.log(`This app listening at http://localhost:${port}`);
  });
}
