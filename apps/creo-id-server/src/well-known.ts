/**
 * OIDC discovery + JWKS endpoints (CREO-118 Phase 1-1 skeleton)
 *
 * 現 phase では placeholder response を返す。 実 key 生成 / endpoint 実装は
 * Phase 1-2 (CREO-119 OAuth AS 実装) で追加。
 *
 * RFC 8414 OAuth 2.0 Authorization Server Metadata
 * OIDC Discovery 1.0
 */
import { Hono } from 'hono'

export interface WellKnownConfig {
  /** Issuer URL — 例: "https://id.creo-memories.in" */
  issuer: string
}

export function createWellKnownApp(config: WellKnownConfig) {
  const app = new Hono()
  const issuer = config.issuer.replace(/\/$/, '')

  // OIDC Discovery
  app.get('/openid-configuration', c =>
    c.json({
      issuer,
      authorization_endpoint: `${issuer}/authorize`,
      token_endpoint: `${issuer}/token`,
      userinfo_endpoint: `${issuer}/userinfo`,
      jwks_uri: `${issuer}/.well-known/jwks.json`,
      response_types_supported: ['code'],
      grant_types_supported: ['authorization_code', 'refresh_token'],
      scopes_supported: ['openid', 'profile', 'email'],
      token_endpoint_auth_methods_supported: [
        'client_secret_basic',
        'client_secret_post',
      ],
      subject_types_supported: ['public'],
      id_token_signing_alg_values_supported: ['RS256'],
      claims_supported: [
        'sub',
        'iss',
        'aud',
        'exp',
        'iat',
        'email',
        'name',
        'handle',
      ],
      // 本 phase は skeleton、 実 endpoint 実装は CREO-119 で
      _status: 'skeleton',
    })
  )

  // JWKS — 現 phase は空 keys (key 生成は Phase 1-2)
  app.get('/jwks.json', c =>
    c.json({
      keys: [],
      // Phase 1-2 で RS256 key pair を生成して kid / n / e などを埋める
      _status: 'skeleton',
    })
  )

  return app
}
