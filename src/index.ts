import puppeteer from 'puppeteer';

// スクレイピングするための関数
const scrape = async (query: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // URL 定義
  await page.goto(`https://www.google.com/search?q=${query}`);

  // タイトルと URL を取得
  const result = await page.$$eval('.tF2Cxc', (elements) => {
    return elements.map((element) => {
      return {
        title: element.querySelector('.DKV0Md')?.textContent,
        url: element.querySelector('.yuRUbf a')?.getAttribute('href'),
      };
    });
  });

  console.log(result);
  await browser.close();
}

// 関数を実行
scrape('aaa');
