type ScrapeResult = {
  title?: string | null,
  url?: string | null,
}

type ResultRow = {
  id: number,
  title: string,
  url: string,
  created_at: string,
}

export {
  ScrapeResult,
  ResultRow,
}
