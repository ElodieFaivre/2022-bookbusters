-- Deploy bookbusters:userlists-views to pg

BEGIN;

CREATE VIEW user_book_in_library AS
    SELECT
        "user".*,
        count("book".*) as book_count_in_library,
        json_agg(json_build_object(
            'book_id', "book"."id",
            'isbn13', "book"."isbn13",
            'isbn10', "book"."isbn10",
            'is_in_library', "user_has_book"."is_in_library",
            'is_in_donation', "user_has_book"."is_in_donation",
            'is_in_favorite', "user_has_book"."is_in_favorite",
            'is_in_alert', "user_has_book"."is_in_alert",
            'donation_date', "user_has_book"."donation_date"
        )) as book_in_library
    FROM "user_has_book"
    JOIN "user" ON "user"."id" = "user_has_book"."user_id"
    JOIN "book" ON "book"."id" = "user_has_book"."book_id"
    WHERE "user_has_book"."is_in_library" = TRUE
    GROUP BY "user"."id";

CREATE VIEW user_book_in_favorite AS
    SELECT
        "user".*,
        count("book".*) as book_count_in_favorite,
        json_agg(json_build_object(
            'book_id', "book"."id",
            'isbn13', "book"."isbn13",
            'isbn10', "book"."isbn10",
            'is_in_library', "user_has_book"."is_in_library",
            'is_in_donation', "user_has_book"."is_in_donation",
            'is_in_favorite', "user_has_book"."is_in_favorite",
            'is_in_alert', "user_has_book"."is_in_alert",
            'donation_date', "user_has_book"."donation_date"
        )) as book_in_favorite
    FROM "user_has_book"
    JOIN "user" ON "user"."id" = "user_has_book"."user_id"
    JOIN "book" ON "book"."id" = "user_has_book"."book_id"
    WHERE "user_has_book"."is_in_favorite" = TRUE
    GROUP BY "user"."id";

CREATE VIEW user_book_in_alert AS
    SELECT
        "user".*,
        count("book".*) as book_count_in_alert,
        json_agg(json_build_object(
            'book_id', "book"."id",
            'isbn13', "book"."isbn13",
            'isbn10', "book"."isbn10",
            'is_in_library', "user_has_book"."is_in_library",
            'is_in_donation', "user_has_book"."is_in_donation",
            'is_in_favorite', "user_has_book"."is_in_favorite",
            'is_in_alert', "user_has_book"."is_in_alert",
            'donation_date', "user_has_book"."donation_date"
        )) as book_in_alert
    FROM "user_has_book"
    JOIN "user" ON "user"."id" = "user_has_book"."user_id"
    JOIN "book" ON "book"."id" = "user_has_book"."book_id"
    WHERE "user_has_book"."is_in_alert" = TRUE
    GROUP BY "user"."id";

COMMIT;
