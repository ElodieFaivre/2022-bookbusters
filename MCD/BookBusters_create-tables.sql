-- SQL script to create tables in BookBusters' database
BEGIN;

DROP TABLE IF EXISTS 
  "chat", 
  "user_book", 
  "book_author", 
  "book_genre", 
  "user_avatar", 
  "avatar", 
  "user", 
  "book", 
  "author", 
  "genre";


-- USER table
CREATE TABLE "user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "pseudo" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "bio" TEXT,
  "location" TEXT,
  "avatar_id" INT NOT NULL DEFAULT 0 REFERENCES "avatar"("id")
);

-- AVATAR table
CREATE TABLE "avatar" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label" TEXT NOT NULL,
  "picture" TEXT NOT NULL
);

-- USER_AVATAR table : a relation table between users and avatars
CREATE TABLE "user_avatar" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "avatar_id" INT NOT NULL REFERENCES "avatar"("id"),
  "user_id" INT NOT NULL REFERENCES "user"("id")
);

-- CHAT table : a relation table between two users : a sender and a receiver
CREATE TABLE "chat" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "message" TEXT NOT NULL,
  "date" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "sender_id" INT NOT NULL REFERENCES "user"("id"),
  "receiver_id" INT NOT NULL REFERENCES "user"("id")
);

-- BOOK table
CREATE TABLE "book" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "isbn" TEXT NOT NULL UNIQUE,
  "isbn_second" TEXT NOT NULL UNIQUE,
  "title" TEXT NOT NULL,
  "cover" TEXT DEFAULT 'default_cover.jpg',
  "format" TEXT,
  "language" TEXT,
  "resume" TEXT,
  "pages_number" INT,
  "editor" TEXT,
  "publication_date" TIMESTAMPTZ
);

-- AUTHOR table
CREATE TABLE "author" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstname" TEXT,
  "lastname" TEXT NOT NULL,
  "nationality" TEXT
);

-- GENRE table
CREATE TABLE "genre" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label" TEXT NOT NULL
);

-- BOOK_AUTHOR table : a relation table between books and authors
CREATE TABLE "book_author" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "book_id" INT NOT NULL REFERENCES "book"("id"),
  "author_id" INT NOT NULL REFERENCES "author"("id")
);

-- BOOK_GENRE table : a relation table between books and genres
CREATE TABLE "book_genre" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "book_id" INT NOT NULL REFERENCES "book"("id"),
  "genre_id" INT NOT NULL REFERENCES "genre"("id")
);

-- USER_BOOK table : a relation table between users and books
CREATE TABLE "user_book" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "user_id" INT NOT NULL REFERENCES "user"("id"),
  "book_id" INT NOT NULL REFERENCES "book"("id"),
  "in_library" BOOLEAN NOT NULL DEFAULT FALSE,
  "in_donations" BOOLEAN NOT NULL DEFAULT FALSE,
  "in_favorites" BOOLEAN NOT NULL DEFAULT FALSE,
  "in_alerts" BOOLEAN NOT NULL DEFAULT FALSE
);

COMMIT;