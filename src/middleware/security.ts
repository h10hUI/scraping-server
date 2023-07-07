import helmet from 'helmet'
import { Express } from 'express'

export const setupSecurity = (app: Express) => {
  // helmet によるセキュリティ対策
  app.use(helmet())

  // content-security-policy の設定
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
      },
    })
  )

  // x-frame-options の設定
  app.use(helmet.frameguard({ action: 'sameorigin' }))

  // x-content-type-options の設定
  app.use(helmet.noSniff())

  // x-xss-protection の設定
  app.use(helmet.xssFilter())

  // referrer-policy の設定
  app.use(helmet.referrerPolicy({ policy: 'same-origin' }))

  // 本番環境では hsts を設定
  // 期間は1年
  if (process.env.NODE_ENV === 'production') {
    app.use(helmet.hsts({ maxAge: 60 * 60 * 24 * 365 }))
  }
}
