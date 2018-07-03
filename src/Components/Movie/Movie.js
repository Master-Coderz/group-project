import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import "./Movie.css";
import Chart from 'chart.js';
export default class Movie extends Component {
  constructor() {
    super();
    this.state = {
      movie: { release_date: "" },
      credits: { crew: [], cast: [] },
      toggleReview: false,
      review_title: "",
      review_content: "",
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
      let reviews = await axios.get(
        `/api/getReviews/${this.props.match.params.id}`
      );
      this.setState({ reviews: reviews.data });
    } catch (err) {
      console.error("componentDidMount failed in Movie.js:", err);
    }
  };


  toggleReview = () => {
    this.setState({ toggleReview: !this.state.toggleReview });
  };

  handleInput = (key, val) => {
    this.setState({ [key]: val });
  };

  addReview = () => {
    let { review_title, review_content } = this.state;
    let body = {
      review_title,
      review_content
    };
    axios
      .post(`/api/addReview/${this.props.match.params.id}`, body)
      .then(() => {
        this.setState({ review_title: "", review_content: "" });
      });
  };

  addToWatchlist = () => {
    axios.post(`/api/addToWatchlist/${this.props.match.params.id}`);
  };

  render() {

    const doughnutData = {
      labels: [
        'Red',
        'Green',
        'Yellow'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }]
    };
    ;
    const featuredCrew = this.state.credits.crew
      .filter((e, i) => i < 6)
      .map(e => {
        return (
          <div key={e.id}>
            <li className="profile">
              <h1>{e.name}</h1>
              <p>{e.job}</p>
            </li>
          </div>
        );
      });

    const topBilledCast = this.state.credits.cast
      .filter((e, i) => i < 6)
      .map(e => {
        return (
          <div className="billed_cast_member" key={e.id}>
            <Link to={`/people/${e.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${e.profile_path}`}
                alt=""
              />
            </Link>
            <a href="#" className="top_billed_cast_name">
              {e.name}
            </a>
            <p className="top_billed_cast_character">{e.character}</p>
          </div>
        );
      });
    const reviews = this.state.reviews.map((elem, i) => {
      return (
        <div key={elem.review_id}>
          {elem.date_added}
          {elem.review_title}
          {elem.review_content}
        </div>
      );
    });
    const Background = `https://image.tmdb.org/t/p/w500/${
      this.state.movie.backdrop_path
      }`;

    const date = this.state.movie.release_date.slice(0, 4)

    return (
      <div>
        <div
          className="custom_bg"
          style={{ backgroundImage: `url(${Background})` }}
        >
          <div className="layer">
            <div className="single_column">
              <section className="images_inner">
                <img
                  className="movie-img"
                  src={`https://image.tmdb.org/t/p/w500/${
                    this.state.movie.poster_path
                    }`}
                  alt=""
                />
                <section className="poster">
                  <div className="header_info">
                    <span>
                      <h1 className="movie_title">
                        {this.state.movie.title}
                        <span className="movie_year">
                          ({date})
                        </span>
                      </h1>{" "}
                    </span>
                    <span className="movie_buttons">
                    <Doughnut data={doughnutData} />
                      <button onClick={this.addToWatchlist}>
                        Add To Watchlist
                      </button>
                    </span>
                    <h3 className="Overview">Overview</h3>
                    <p className="Overview-p">{this.state.movie.overview}</p>
                    <h3 className="featured_crew">Featured Crew</h3>
                    <div className="featuredCrew">{featuredCrew}</div>
                  </div>
                  <hr />
                </section>
              </section>
            </div>
          </div>
        </div>
        <div className="top_billed_scroller">
          <h3 className="top_billed_cast_h3">Top Billed Cast</h3>
          <div className="top_billed_cast_container">{topBilledCast}</div>
        </div>
        <div className='facts'>
          <span>Facts</span>
        </div>
        <button onClick={this.toggleReview}>Leave a review</button>
        {this.state.toggleReview === true ? (
          <div>
            <input
              placeholder="title"
              onChange={e => this.handleInput("review_title", e.target.value)}
              value={this.state.review_title}
            />
            <textarea
              placeholder="thoughts, comments, concerns...?"
              onChange={e => this.handleInput("review_content", e.target.value)}
              value={this.state.review_content}
            />
            <button onClick={() => this.addReview()}>Submit</button>
          </div>
        ) : null}
        {reviews}
      </div>
    );
  }
}
