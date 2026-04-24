# syntax=docker/dockerfile:1.4
# =============================================================================
# Creo ID Server — 最小 multi-stage Bun build
# =============================================================================

FROM oven/bun:1 AS deps

WORKDIR /app

COPY package.json ./
COPY bun.lock* ./
COPY tsconfig.json ./
COPY apps/creo-id-server/package.json apps/creo-id-server/package.json

RUN bun install

# =============================================================================
FROM oven/bun:1-slim AS production

WORKDIR /app

ENV NODE_ENV=production
ENV CREO_ID_PORT=3000

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./
COPY --from=deps /app/apps/creo-id-server/node_modules apps/creo-id-server/node_modules
COPY apps/creo-id-server/ apps/creo-id-server/

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD bun -e "fetch('http://127.0.0.1:3000/health').then(r => process.exit(r.ok ? 0 : 1))"

WORKDIR /app/apps/creo-id-server

CMD ["bun", "run", "src/index.ts"]
