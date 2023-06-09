import fs from 'fs';

export const writeToFile = (filePath: string, data: string, callback: (err: NodeJS.ErrnoException | null) => void) => {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.log(err);
    }

    callback(err);
  });
}
