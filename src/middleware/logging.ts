import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import winston from 'winston';
import { Express } from 'express';

const logDir = path.join(__dirname, '../../logs');

export const setupLogging = (app: Express) => {
  // logs ディレクトリがなければ作成
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // アクセスログを出力するファイルの指定
  const accessLogStream = fs.createWriteStream(
    path.join(logDir, 'access.log'),
    { flags: 'a' }
  );

  // アクセスログを出力する
  app.use(morgan('combined', { stream: accessLogStream }));
};

// winston の設定
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    // error レベルのログを出力する
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
    }),
    // info レベルのログを出力する
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log')
    }),
  ],
});

// 開発環境の場合は console にも出力する
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
};
