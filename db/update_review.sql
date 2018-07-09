update tmdb_reviews
set review_title = $1, review_content = $2
where user_id = $3 and review_id = $4