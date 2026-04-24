-- 001: creo/auth DB 初期 schema skeleton (CREO-118)
--
-- 本 migration は Creo ID Phase 1-1 の starting point。 OAuth AS 本実装
-- (CREO-119) で table fields を充実させる。 現 phase は table 存在のみ宣言、
-- SCHEMAFULL 化 / field 定義は次 phase。
--
-- NS / DB: creo / auth (creo/memories / chronista/hub とは分離)

-- ============================================================
-- 1. Namespace / Database 準備
-- ============================================================

DEFINE NAMESPACE OVERWRITE creo;

USE NS creo;

DEFINE DATABASE OVERWRITE auth;

USE DB auth;

-- ============================================================
-- 2. Table skeleton — user
-- ============================================================
-- Email + profile 保持。 CREO-119 で field 定義 (email UNIQUE, handle, ...).

DEFINE TABLE OVERWRITE user TYPE NORMAL SCHEMALESS
  COMMENT 'User account — Email = Identity SSOT (memory: creo-id-identity-principle)';

-- ============================================================
-- 3. Table skeleton — session
-- ============================================================

DEFINE TABLE OVERWRITE session TYPE NORMAL SCHEMALESS
  COMMENT 'Active login sessions';

-- ============================================================
-- 4. Table skeleton — oauth_client
-- ============================================================

DEFINE TABLE OVERWRITE oauth_client TYPE NORMAL SCHEMALESS
  COMMENT 'Registered OAuth client applications (chronista-hub / memories / vp 等)';

-- ============================================================
-- 5. Table skeleton — authorization_code
-- ============================================================

DEFINE TABLE OVERWRITE authorization_code TYPE NORMAL SCHEMALESS
  COMMENT 'Short-lived authorization codes (code grant flow)';

-- ============================================================
-- 6. Table skeleton — access_token
-- ============================================================

DEFINE TABLE OVERWRITE access_token TYPE NORMAL SCHEMALESS
  COMMENT 'Access tokens (JWT id_token + RS256 signed)';

-- ============================================================
-- 7. Table skeleton — refresh_token
-- ============================================================

DEFINE TABLE OVERWRITE refresh_token TYPE NORMAL SCHEMALESS
  COMMENT 'Refresh tokens for long-lived sessions';

-- ============================================================
-- 8. Table skeleton — device_code
-- ============================================================

DEFINE TABLE OVERWRITE device_code TYPE NORMAL SCHEMALESS
  COMMENT 'Device authorization grant (RFC 8628) codes';

-- ============================================================
-- 9. Migration tracker
-- ============================================================

DEFINE TABLE OVERWRITE _migrations TYPE NORMAL SCHEMALESS
  COMMENT 'Applied migrations log';

DEFINE FIELD OVERWRITE name ON _migrations TYPE string;
DEFINE FIELD OVERWRITE applied_at ON _migrations TYPE datetime DEFAULT time::now();
