-- Verify bookbusters:lowercase-isbn on pg

BEGIN;

SELECT "isbn13", "isbn13_formatted", "isbn10", "isbn10_formatted" FROM "book" WHERE false;

ROLLBACK;
