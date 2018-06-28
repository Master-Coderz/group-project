import React, { Component } from "react";
import axios from "axios";
export default class Movie extends Component {
  constructor() {
    super();
    this.state = {
      movie: {},
      credits: { crew: [], cast: [] },
      toggleReview: false,
      review_title: '',
      review_content: '',
      reviews: []
    };
  }

  componentDidMount = async () => {
    try {
      let res = await axios.get(
        `https://api.themoviedb.org/3/movie/${
        this.props.match.params.id
        }?api_key=${
        process.env.REACT_APP_API_KEY
        }&language=en-US&append_to_response=credits`
      );

      this.setState({ movie: res.data });
      this.setState({ credits: res.data.credits });
      let reviews = await axios.get(`/api/getReviews/${this.props.match.params.id}`)
      console.log(reviews)
      this.setState({ reviews: reviews.data })
    } catch (err) {
      console.error("componentDidMount failed in Movie.js:", err);
    }
  };

  toggleReview = () => {
    this.setState({ toggleReview: !this.state.toggleReview })
  }

  handleInput = (key, val) => {
    this.setState({ [key]: val })
  }

  addReview = () => {
    let { review_title, review_content } = this.state
    let body = {
      review_title,
      review_content
    }
    axios.post(`/api/addReview/${this.props.match.params.id}`, body).then(() => {
      this.setState({ review_title: '', review_content: '' })
    })
  }

  addToWatchlist = () => {
    axios.post(`/api/addToWatchlist/${this.props.match.params.id}`)
  }

  render() {
    const featuredCrew = this.state.credits.crew
      .filter((e, i) => i < 6)
      .map(e => {
        return (
          <div key={e.id}>
            <h1>{e.name}</h1>
            <p>{e.job}</p>
            <hr />
          </div>
        );
      });

    const topBilledCast = this.state.credits.cast
      .filter((e, i) => i < 6)
      .map(e => {
        return (
          <div key={e.id}>
            <h1>{e.name}</h1>
            <p>{e.character}</p>
            <hr />
          </div>
        );
      });
    const reviews = this.state.reviews.map((elem, i) => {
      return <div key={elem.review_id}>
        {elem.date_added}
        {elem.review_title}
        {elem.review_content}
      </div>
    })
    return (
      <div>
        <div className="movie-main" />
        <span>
          <h1>{this.state.movie.title}</h1>{" "}
          <h2>{this.state.movie.release_date}</h2>
        </span>
        <img
          src={`https://image.tmdb.org/t/p/w500/${
            this.state.movie.poster_path
            }`}
          alt=''
        />
        <button onClick={this.addToWatchlist}>Add To Watchlist</button>
        <p>{this.state.movie.overview}</p>
        <h2>Featured Crew</h2>
        {featuredCrew}
        <hr />
        <h2>Top Billed Cast</h2>
        {topBilledCast}
        <button onClick={this.toggleReview}>Leave a review</button>
        {this.state.toggleReview === true ?
          <div>
            <input placeholder='title' onChange={(e) => this.handleInput('review_title', e.target.value)} value={this.state.review_title} />
            <textarea placeholder='thoughts, comments, concerns...?' onChange={(e) => this.handleInput('review_content', e.target.value)} value={this.state.review_content} />
            <button onClick={() => this.addReview()}>Submit</button>
          </div>
          : null}
        {reviews}
      </div>
    );
  }
}
