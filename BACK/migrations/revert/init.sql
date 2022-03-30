-- Revert bookbusters:init from pg

BEGIN;

-- XXX Add DDLs here.
DROP TABLE "chat", "user_has_book", "book", "user", "avatar";

COMMIT;
