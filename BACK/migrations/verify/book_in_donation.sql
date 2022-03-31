-- Verify bookbusters:book_in_donation on pg

BEGIN;

-- XXX Add verifications here.
SELECT * FROM book_in_donation WHERE false;

ROLLBACK;
