module.exports = {
    addReview: (req, res) => {
        const db = req.app.get('db')
        
        let { movie_id } = req.params
        let {
            review_content,
            review_title,
        } = req.body

        db.add_review([
            
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