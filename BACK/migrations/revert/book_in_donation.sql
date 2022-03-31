-- Revert bookbusters:book_in_donation from pg

BEGIN;

-- XXX Add DDLs here.
DROP VIEW book_in_donation;

COMMIT;
