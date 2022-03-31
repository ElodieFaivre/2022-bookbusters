-- Revert bookbusters:lowercase-isbn from pg

BEGIN;

ALTER TABLE "book" RENAME COLUMN "isbn13" TO "ISBN13";
ALTER TABLE "book" RENAME COLUMN "isbn13_formatted" TO "ISBN13_formatted";
ALTER TABLE "book" RENAME COLUMN "isbn10" TO "ISBN10";
ALTER TABLE "book" RENAME COLUMN "isbn10_formatted" TO "ISBN10_formatted";

COMMIT;
