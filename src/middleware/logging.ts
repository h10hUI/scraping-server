import morgan from "morgan";
import fs from "fs";
import path from "path";
import { Express } from "express";

export const setupLogging = (app: Express) => {
  const logDir = path.join(__dirname, "../../logs");

  // logs ディレクトリがなければ作成
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
  }

  // アクセスログを出力するファイルの指定
  const accessLogStream = fs.createWriteStream(
    path.join(logDir, "access.log"),
    { flags: "a" }
  );

  // アクセスログを出力する
  app.use(morgan("combined", { stream: accessLogStream }));
};
