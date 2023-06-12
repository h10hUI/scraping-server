import puppeteer, { Browser, Page } from 'puppeteer';
import moment from 'moment';
import { ScrapeResult } from '../types/types';
import { writeToFile } from '../utils/fileUtils';
import { saveResultToDb } from '../utils/dbUtils';

export const scrape = async (query: string) => {
  const browser: Browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: '/usr/bin/chromium-browser',
  });
  const page: Page = await browser.newPage();

  // URL 定義
  await page.goto(`https://www.google.com/search?q=${query}`);

  // 日時取得
  const date: string = moment().format('YYYYMMDDHHmmss');

  // タイトルと URL を取得
  const result: ScrapeResult[] = await page.$$eval('.tF2Cxc', (elements: Element[]) => {
    return elements.map((element: Element): ScrapeResult => {
      return {
        title: element.querySelector('.DKV0Md')?.textContent,
        url: element.querySelector('.yuRUbf a')?.getAttribute('href'),
      };
    });
  });

  // json を csv に変換
  let csv = "title,url\n"; // ヘッダー項目
  for (let item of result) {
    csv += `"${item.title}","${item.url}"\n`;
  }

  // 5分ごとに日時をファイル名に入れて保存
  // db にも保存
  setInterval(() => {
    writeToFile(`./db/result-${date}.csv`, csv, (err) => {
      if (err) {
        console.log(err);
      }
    });

    saveResultToDb(result);
  }, 300000);

  await browser.close();
}
