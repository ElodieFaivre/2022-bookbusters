-- Deploy bookbusters:init to pg

BEGIN;

CREATE TABLE "avatar"(
  "id" integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "label" text NOT NULL UNIQUE,
  "picture" text NOT NULL UNIQUE
);

CREATE TABLE  "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" text NOT NULL UNIQUE,
    "password" text NOT NULL,
    "bio" text,
    "location" POINT NOT NULL,
    "mail_donation" BOOLEAN DEFAULT TRUE,
    "mail_alert"  BOOLEAN DEFAULT TRUE,
    "avatar_id" INT NOT NULL REFERENCES "avatar"("id") DEFAULT 1
);

CREATE TABLE "book" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "ISBN13" TEXT UNIQUE,
    "ISBN13_formatted" TEXT UNIQUE,
    "ISBN10" TEXT UNIQUE,
    "ISBN10_formatted" TEXT UNIQUE
);

CREATE TABLE "user_has_book" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" INT NOT NULL REFERENCES "user"("id"),
    "book_id" INT NOT NULL REFERENCES "book"("id"),
    "is_in_library" BOOLEAN DEFAULT false,
    "is_in_donation" BOOLEAN DEFAULT false,
    "is_in_favorite" BOOLEAN DEFAULT false,
    "is_in_alert" BOOLEAN DEFAULT false,
    "donation_date" TIMESTAMPTZ
);

CREATE TABLE "chat" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "message_label" TEXT NOT NULL,
    "date" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "sender_id" INT NOT NULL REFERENCES "user"("id"),
    "receiver_id" INT NOT NULL REFERENCES "user"("id")
);



COMMIT;
