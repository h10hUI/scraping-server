import rateLimit from 'express-rate-limit'

// 15分で100回までに制限
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
})
