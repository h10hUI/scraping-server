import 'dotenv/config'
import { scrape } from './scrape/Scrape'

const searchQuery: string = process.env.SEARCH_QUERY || ''

scrape(searchQuery)
