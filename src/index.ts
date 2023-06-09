import puppeteer, { Browser, Page } from 'puppeteer';
import fs from 'fs';
import moment from 'moment';

type ScrapeResult = {
  title?: string | null,
  url?: string | null,
}

// スクレイピングするための関数
const scrape = async (query: string) => {
  const browser: Browser = await puppeteer.launch();
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
  setInterval(() => {
    fs.writeFile(`result-${date}.csv`, csv, (err) => {
      if (err) {
        console.log(err);
      }
    });
  }, 300000);

  await browser.close();
}

// 関数を実行
scrape('aaa');
