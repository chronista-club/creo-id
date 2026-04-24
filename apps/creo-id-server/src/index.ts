/**
 * Creo ID Server (CREO-118 Phase 1-1 scaffold)
 *
 * OIDC authorization server for the Chronista ecosystem。
 *
 * Phase 進行:
 *   - CREO-118 (本 commit): scaffold + /health + /.well-known/* skeleton
 *   - CREO-119: OAuth AS 実装 (authorize / token / userinfo、 RS256 key 生成)
 *   - CREO-120: Login UI
 *   - CREO-121: users / api-keys management API
 *   - CREO-122: DNS 付替 (id.creo-memories.in → 本 server)
 */
import { Hono } from 'hono'
import { createHealthApp, type HealthInfo } from './health.js'
import { createWellKnownApp, type WellKnownConfig } from './well-known.js'

const SERVICE_NAME = 'creo-id'
const VERSION = '0.0.1'

export interface AppOptions {
  info?: HealthInfo
  wellKnown?: WellKnownConfig
}

export function createApp(options: AppOptions = {}) {
  const info = options.info ?? { name: SERVICE_NAME, version: VERSION }
  const wellKnownConfig = options.wellKnown ?? {
    issuer: process.env.CREO_ID_ISSUER ?? 'http://localhost:3000',
  }

  const app = new Hono()
  app.route('/health', createHealthApp(info))
  app.route('/.well-known', createWellKnownApp(wellKnownConfig))
  app.get('/', c =>
    c.json({
      service: info.name,
      version: info.version,
      issuer: wellKnownConfig.issuer,
    })
  )
  return app
}

// Bun runtime エントリ
if (import.meta.main) {
  const port = Number(process.env.CREO_ID_PORT ?? 3000)
  const app = createApp()
  console.log(`[${SERVICE_NAME}] listening on :${port}`)
  Bun.serve({ port, fetch: app.fetch })
}
