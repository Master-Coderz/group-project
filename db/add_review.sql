insert into tmdb_reviews(
user_id, review_content, review_title, movie_id, date_added, firstname, lastname, profilepic
) 
values($1, $2, $3, $4,$5, $6, $7, $8)
