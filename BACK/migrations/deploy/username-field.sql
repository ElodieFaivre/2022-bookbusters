-- Deploy bookbusters:username-field to pg

BEGIN;

ALTER TABLE "user" ADD COLUMN "username" text NOT NULL;

COMMIT;
