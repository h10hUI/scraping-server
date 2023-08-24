import puppeteer, { Browser, Page } from 'puppeteer'
import moment from 'moment'
import fs from 'fs'
import path from 'path'
import { ScrapeResult } from '../types/Types'
import { writeToFile, deleteOldFiles } from '../utils/FileUtils'
import { saveResultToDb } from '../utils/DbUtils'
import { logger } from '../middleware/Logging'

export const scrape = async (query: string) => {
  const browser: Browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  })
  const page: Page = await browser.newPage()

  // URL 定義
  await page.goto(`https://www.google.com/search?q=${query}`)

  // 日時取得
  const date: string = moment().format('YYYYMMDDHHmmss')

  // db ディレクトリを定数化
  const dbDirPath: string = path.resolve(__dirname, '../../db')

  // タイトルと URL を取得
  const result: ScrapeResult[] = await page.$$eval('.tF2Cxc', (elements: Element[]) => {
    return elements.map((element: Element): ScrapeResult => {
      return {
        title: element.querySelector('.DKV0Md')?.textContent,
        url: element.querySelector('.yuRUbf a')?.getAttribute('href'),
      }
    })
  })

  // json を csv に変換
  let csv = 'title,url\n' // ヘッダー項目
  for (const item of result) {
    csv += `"${item.title}","${item.url}"\n`
  }

  // 設定時間ごとに日時をファイル名に入れて保存
  // db にも保存
  const scrapeInterval = 5 * 60 * 1000

  setInterval(() => {
    // ./db/archives ディレクトリがなければ作成
    // あればそこに `result-${date}.csv 形式で保存
    if (!fs.existsSync(path.join(dbDirPath, 'archives'))) {
      fs.mkdirSync(path.join(dbDirPath, 'archives'))
    }

    writeToFile(path.join(dbDirPath, 'archives', `result-${date}.csv`), csv, (err) => {
      if (err) {
        logger.error(err)
      }
    })

    saveResultToDb(result)

    deleteOldFiles(path.join(dbDirPath, 'archives'))
  }, scrapeInterval)

  await browser.close()
}
