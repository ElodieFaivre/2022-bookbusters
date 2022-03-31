-- Verify bookbusters:username-field on pg

BEGIN;

SELECT "username" FROM "user" WHERE false;

ROLLBACK;
