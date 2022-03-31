-- Deploy bookbusters:lowercase-isbn to pg

BEGIN;

ALTER TABLE "book" RENAME COLUMN "ISBN13" TO "isbn13";
ALTER TABLE "book" RENAME COLUMN "ISBN13_formatted" TO "isbn13_formatted";
ALTER TABLE "book" RENAME COLUMN "ISBN10" TO "isbn10";
ALTER TABLE "book" RENAME COLUMN "ISBN10_formatted" TO "isbn10_formatted";

COMMIT;
