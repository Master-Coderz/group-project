module.exports = {
    addReview: (req, res) => {
    console.log(req.user)
        const db = req.app.get('db')
            const id = req.user.id;
        let { movie_id } = req.params
        let {
            review_content,
            review_title,
        } = req.body

        db.add_review([
            id,
            review_content,
            review_title,
            movie_id,
            new Date()
        ])
            .then((review) => {
                res.status(200).send(review)
            })
            .catch((err) => {
                res.status(500).send(err)
            })
    }
}