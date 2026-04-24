# Creo ID

OIDC authorization server for the Chronista ecosystem.

## 何

`id.creo-memories.in` (現状 Creo Memories と共居、 将来独立 domain の可能性) で動く **auth 専任サーバ**。 Creo ecosystem 全 product (Memories / Hub / VP / CPLP / FleetStage / GFP) が SSO で接続する。

## 設計原則 (memory: `creo-id-identity-principle.md`)

- **Email = Identity SSOT** — DB UNIQUE 制約、 SSO は auth method
- **Recovery は Magic Link 主導** — passwordless first
- **Standalone server** — chronista-club/creo-id (本 repo、 2026-04-24 切り出し) で独立

## Status

- **Phase 0** — 独立 repo 切り出し ([CREO-93](https://linear.app/chronista/issue/CREO-93) 系)
- **Phase 1** — baseline scaffold (本 commit)
- **Phase 2** (後続) — OAuth AS 実装 ([CREO-118](https://linear.app/chronista/issue/CREO-118) 相当)
- **Phase 3** (後続) — Login UI

## Development

```bash
bun install
bun run typecheck
bun run check
bun test
```

## Workspace layout

```
creo-id/
├── apps/
│   └── creo-id-server/  (future: OIDC AS backend)
├── packages/             (future: shared libs — JWT helpers, sanitizeReturnTo 等)
└── docs/                 (spec / design、 追って追加)
```

## Related

- Linear Epic: [CREO-93](https://linear.app/chronista/issue/CREO-93) Creo ID 独立認証サーバ化
- Dependency target: [`chronista-club/chronista-hub`](https://github.com/chronista-club/chronista-hub) — identity を consume する product meta-registry
- Design memory (creo-memories 内): `creo-id-identity-principle.md` / `creo-id-standalone-service-decision.md`

## License

TBD
