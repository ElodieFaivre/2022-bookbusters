-- Revert bookbusters:username-field from pg

BEGIN;

ALTER TABLE "user" DROP COLUMN "username";

COMMIT;
