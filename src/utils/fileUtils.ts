import fs from 'fs';
import moment from 'moment';
import { logger } from '../middleware/logging';

export const writeToFile = (filePath: string, data: string, callback: (err: NodeJS.ErrnoException | null) => void) => {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      logger.error(err);
    }

    callback(err);
  });
}

// 一週間以上前のファイルを削除する
// ファイルは ./db/archives/result-${date}.csv の形式で保存されている
export const deleteOldFiles = (dirPath: string) => {
  const files = fs.readdirSync(dirPath);
  const now = moment();
  const oneWeekAgo = now.subtract(1, 'weeks');

  files.forEach((file) => {
    const date = moment(file.split('-')[1].split('.')[0], 'YYYYMMDDHHmmss');

    if (date.isBefore(oneWeekAgo)) {
      fs.unlinkSync(`${dirPath}/${file}`);
    }
  });
}
