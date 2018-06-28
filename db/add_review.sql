insert into tmdb_reviews(
user_id, review_content, review_title, movie_id, date_added
) 
values($1, $2, $3, $4,$5)
