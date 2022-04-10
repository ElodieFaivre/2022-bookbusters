DROP FUNCTION get_book(integer,integer[],text[],text[]);




CREATE FUNCTION get_book
(
	connected_user INT DEFAULT 0,
	books_ids INT[] DEFAULT '{}'::INT[],
	books_isbn13s TEXT[] DEFAULT '{}'::TEXT[],
	books_isbn10s TEXT[] DEFAULT '{}'::TEXT[]
)
RETURNS TABLE (
    "id" INT,
    "isbn13" TEXT,
    "isbn10" TEXT,
    "connected_user" JSON,
    "last_donation_date" TIMESTAMPTZ,
    "number_of_donors" INT,
    "donors" JSON
) AS $$

	SELECT
	    "book"."id", "book"."isbn13", "book"."isbn10",
	    ROW_TO_JSON("connected_user") AS "connected_user",
	    MAX("donor"."donation_date") AS "last_donation_date",
	    COUNT("donor".*) AS "number_of_donors",
	    COALESCE(JSON_AGG(TO_JSONB("donor".*)) FILTER (WHERE "donor"."donor_id" IS NOT NULL), NULL) AS "donors"

	FROM book

	LEFT JOIN (
	    SELECT
	    	"user_has_book"."user_id" AS "donor_id",
	    	"user"."username",
	    	"avatar"."picture" AS "avatar",
	    	"user"."email",
	    	"user"."location",
	    	"user_has_book"."book_id",
	    	"user_has_book"."donation_date"
	    FROM "user_has_book"
	    JOIN "user" ON "user"."id" = "user_has_book"."user_id"
        JOIN "avatar" ON "avatar"."id" = "user"."avatar_id"
	    WHERE "user_has_book"."is_in_donation" = TRUE
	    AND "user_has_book"."user_id" <> ("connected_user")::INT
	) "donor"
	ON "book"."id" = "donor"."book_id"

	LEFT JOIN (
	    SELECT
	    	"user"."id" AS "user_id",
	    	"user"."username",
	    	"avatar"."picture" AS "avatar",
	    	"user"."email",
	    	"user"."location"::TEXT,
	    	"user_has_book"."id" AS "associations_id",
	    	"user_has_book"."book_id",
	    	"user_has_book"."is_in_library",
	    	"user_has_book"."is_in_donation",
	    	"user_has_book"."donation_date",
	    	"user_has_book"."is_in_favorite",
	    	"user_has_book"."is_in_alert"
	    FROM "user_has_book"
	    JOIN "user" ON "user"."id" = "user_has_book"."user_id"
        JOIN "avatar" ON "avatar"."id" = "user"."avatar_id"
	    WHERE "user_has_book"."user_id" = ("connected_user")::INT
	) AS "connected_user"
	ON "book"."id" = "connected_user"."book_id"

	WHERE

		CASE WHEN ("books_ids" = '{}' AND "books_isbn13s" = '{}' AND "books_isbn10s" = '{}')
		THEN TRUE
		ELSE

			CASE "books_ids"
				WHEN '{}' THEN "book"."id" = 0
				ELSE "book"."id" = ANY ("books_ids"::INT[])
			END

			OR

			CASE "books_isbn13s"
				WHEN '{}' THEN "book"."isbn13" = '0'
				ELSE "book"."isbn13" = ANY ("books_isbn13s"::TEXT[])
			END

			OR

			CASE "books_isbn10s"
				WHEN '{}' THEN "book"."isbn10" = '0'
				ELSE "book"."isbn10" = ANY ("books_isbn10s"::TEXT[])
			END

		END

	GROUP BY "book"."id", "connected_user".*;

$$ LANGUAGE SQL STRICT;






SELECT * FROM get_book(3, '{1,3}', '{9782412034392}', '{2081386690,2330113552}');
SELECT * FROM get_book(0, '{1,3}', '{9782412034392}', '{2081386690,2330113552}');
SELECT * FROM get_book(3, '{}', '{9782412034392}', '{2081386690,2330113552}');
SELECT * FROM get_book(3, '{1,3}', '{}', '{2081386690,2330113552}');
SELECT * FROM get_book(3, '{1,3}', '{9782412034392}', '{}');
SELECT * FROM get_book(3, '{1,3}', '{}', '{}');
SELECT * FROM get_book(3, '{}', '{9782412034392}', '{}');
SELECT * FROM get_book(3, '{}', '{}', '{2081386690,2330113552}');
SELECT * FROM get_book(3, '{}', '{}', '{}');
