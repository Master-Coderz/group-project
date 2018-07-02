module.exports = {
  addReview: (req, res) => {
    const db = req.app.get("db");
    const id = req.user.id;
    let { movie_id } = req.params;
    let { review_content, review_title } = req.body;

    db.add_review([id, review_content, review_title, movie_id, new Date()])
      .then(review => {
        res.status(200).send(review);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  getReviews: (req, res) => {
    const db = req.app.get("db");

    db.get_reviews([req.params.movie_id])
      .then(reviews => {
        res.status(200).send(reviews);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  addToWatchlist: (req, res) => {
    const db = req.app.get("db");
    const user_id = req.user.id;
    const {title, poster_path} = req.body
    

    db.add_to_watchlist([user_id, req.params.movie_id, title, poster_path])
      .then(() => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.sendStatus(500);
        console.error(err);
      });
  },

  getUserInfo: (req, res) => {
    const db = req.app.get("db");
    user_id = req.user.id;

    db.get_user([user_id])
      .then(userResult => {
        res.status(200).send(userResult);
      })
      .catch(err => {
        res.sendStatus(500);
        console.error(err);
      });
  },

  getWatchlist: (req, res) => {
    const db = req.app.get("db");
    user_id = req.user.id;
    db.get_watchlist([user_id]).then(list => {
      res.status(200).send(list);
    })
    .catch((err) => {
        res.sendStatus(500)
        console.log(err)
    } )
  }
};
