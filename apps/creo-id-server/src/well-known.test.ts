import { describe, expect, it } from 'bun:test'
import { createWellKnownApp } from './well-known.js'

describe('createWellKnownApp — openid-configuration', () => {
  const app = createWellKnownApp({ issuer: 'https://id.creo-memories.in' })

  it('200 + issuer matches config', async () => {
    const res = await app.request('/openid-configuration')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.issuer).toBe('https://id.creo-memories.in')
  })

  it('includes standard OIDC endpoints', async () => {
    const res = await app.request('/openid-configuration')
    const body = await res.json()
    expect(body.authorization_endpoint).toBe(
      'https://id.creo-memories.in/authorize'
    )
    expect(body.token_endpoint).toBe('https://id.creo-memories.in/token')
    expect(body.userinfo_endpoint).toBe('https://id.creo-memories.in/userinfo')
    expect(body.jwks_uri).toBe(
      'https://id.creo-memories.in/.well-known/jwks.json'
    )
  })

  it('supports authorization_code grant', async () => {
    const res = await app.request('/openid-configuration')
    const body = await res.json()
    expect(body.grant_types_supported).toContain('authorization_code')
    expect(body.grant_types_supported).toContain('refresh_token')
  })

  it('supports openid / profile / email scopes', async () => {
    const res = await app.request('/openid-configuration')
    const body = await res.json()
    expect(body.scopes_supported).toContain('openid')
    expect(body.scopes_supported).toContain('profile')
    expect(body.scopes_supported).toContain('email')
  })

  it('declares RS256 signing', async () => {
    const res = await app.request('/openid-configuration')
    const body = await res.json()
    expect(body.id_token_signing_alg_values_supported).toContain('RS256')
  })

  it('normalizes trailing slash in issuer', async () => {
    const slashed = createWellKnownApp({
      issuer: 'https://id.creo-memories.in/',
    })
    const res = await slashed.request('/openid-configuration')
    const body = await res.json()
    expect(body.issuer).toBe('https://id.creo-memories.in')
    expect(body.token_endpoint).toBe('https://id.creo-memories.in/token')
  })

  it('marks skeleton status', async () => {
    const res = await app.request('/openid-configuration')
    const body = await res.json()
    expect(body._status).toBe('skeleton')
  })
})

describe('createWellKnownApp — jwks.json', () => {
  const app = createWellKnownApp({ issuer: 'https://id.creo-memories.in' })

  it('200 + empty keys array', async () => {
    const res = await app.request('/jwks.json')
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(Array.isArray(body.keys)).toBe(true)
    expect(body.keys).toEqual([])
  })

  it('marks skeleton status', async () => {
    const res = await app.request('/jwks.json')
    const body = await res.json()
    expect(body._status).toBe('skeleton')
  })
})
