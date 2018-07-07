import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Doughnut, Bar } from "react-chartjs-2";
import axios from "axios";
import "./Movie.css";
import Chart from 'chart.js';
const moment = require("moment");

export default class Movie extends Component {
  constructor() {
    super();
    this.state = {
      movie: { release_date: "", budget: "", vote_average: "" },
      credits: { crew: [], cast: [] },
      toggleReview: false,
      review_title: "",
      review_content: "",
      reviews: [],
      video: [],
      onWatchlist: null
    };
  }

  componentDidMount = async () => {
    this.getMovieVideo()
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
      
      let checkWatchlist = await axios.get(`/api/checkWatchlistMovie/${this.props.match.params.id}`)
      console.log(checkWatchlist)
      this.setState({onWatchlist: checkWatchlist.data})
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
    let {title, poster_path} = this.state.movie
    axios.post(`/api/addToWatchlist/${this.props.match.params.id}`, {title, poster_path});
  };

  getMovieVideo() {
    axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
      .then((res) => {
        this.setState({
          video: res.data.results[0]
        })
      })
  }

  render() {
    // const donutColor = function(){
    //   if(this.state.movie.vote_average<70){
    //     donutColor = 'yellow'
    //   }
    //   else if (this.state.movie.vote_average < 50){
    //     donutColor = 'red'
    //   }
    //   else{
    //     donutColor = '#00DB76'
    //   }
    // }
    const doughnutData = {
      datasets: [{
        label: 'Red',
        data: [this.state.movie.vote_average * 10, 100 - this.state.movie.vote_average * 10],

        backgroundColor: [
          '#00DB76',
          '#0A4827'
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
      var review_date = moment(elem.date_added).format("LL");
      return (
        <div className='review_card' key={elem.review_id}>
          <div className="review_top">
            <img src="" alt="" className="review_user_img" />
            <p className="review_date">Review left on {review_date}</p>
          </div>
          <div className="review_bottom">
            <p className="review_title">{elem.review_title}</p>
            <p className="review_content">{elem.review_content}</p>
          </div>
        </div>
      );
    });
    const Background = `https://image.tmdb.org/t/p/w500/${
      this.state.movie.backdrop_path
      }`;

    const date = this.state.movie.release_date.slice(0, 4)
    console.log(this.state.movie)
    return (
      <div className='Movie_root'>
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
                    <span className='movie_title_container'>
                      <h1 className="movie_title">
                        {this.state.movie.title}
                        <span className="movie_year">
                          ({date})
                        </span>
                      </h1>{" "}
                    </span>
                    <div className="movie_buttons">
                      <div className="doughnut_bg"></div>
                      <div className="doughnut_container">
                        <Doughnut data={doughnutData} options={{
                          layout: {
                            padding: {
                              left: 0,
                            }
                          },
                          cutoutPercentage: 75,
                          elements: {
                            arc: {
                              borderWidth: 0
                            }
                          },
                          tooltips: {
                            enabled: false,
                          }
                        }} />

                        <div className="rating">{this.state.movie.vote_average * 10} <span className="percentage">%</span></div>
                      </div>

                      {this.state.onWatchlist ? <span className='test'>Delete from Watchlist</span> : <button className='add_to_watchlist_btn' onClick={this.addToWatchlist}></button> }
                      <button className='add_to_watchlist_btn_2'>

                      </button>
                      <button className='add_to_watchlist_btn_3'>

                      </button>
                    </div>
                          {this.state.video ?
                      < iframe src={`http://www.youtube.com/embed/${this.state.video.key}`}
                        width="560" height="315" frameborder="0" allowfullscreen></iframe> : null}
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
        <div className="bottom_wrapper">
          <div className="white_column">
            <div className="top_billed_scroller">
              <h3 className="top_billed_cast_h3">Top Billed Cast</h3>
              <div className="top_billed_cast_container">{topBilledCast}</div>
            </div>
            <div className="leave_review">
              <button className='leave_review_btn' onClick={this.toggleReview}>Leave a review</button>

              <div className={this.state.toggleReview ? 'review_form rf_show' : 'review_form rf_hidden'}>
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
                <div className="submit_button_div">
                  <button onClick={() => this.addReview()}>Submit</button>
                </div>
              </div>

            </div>
            <div className={this.state.toggleReview ? 'reviews_container_hidden reviews_hidden' : 'reviews_container'}>
              {reviews}
            </div>
          </div>
          <div className="grey_column">
            <div className="grey_column_content">
              <p className="grey_column_title">Facts</p>
              <p className="grey_column_status"><p>Status</p>{this.state.movie.status}</p>
              <p className="grey_column_release_information"><p>Release Date</p>{moment(this.state.movie.release_date).format('LL')}</p>
              <p className="grey_column_release_information"><p>Original Language</p>{this.state.movie.original_language}</p>
              <p className="grey_column_release_information"><p>Budget</p>$ {this.state.movie.budget}</p>
              <p className="grey_column_release_information"><p>Runtime</p>{this.state.movie.runtime} Minutes</p>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
