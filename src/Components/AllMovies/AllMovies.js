import React, { Component } from "react";
import axios from "axios";
import "./AllMovies.css";
import { Link } from "react-router-dom";
const moment = require("moment");

export default class AllMovies extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }

  componentDidMount = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&page=1`
      );
      this.setState({ movies: res.data.results });
    } catch (err) {
      console.error("componentDidMount failed in AllMovies component:", err);
    }
  };
  formatDate(date) {
    var newDate = parseInt(date);
    var monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    var day = newDate.getDate();
    var monthIndex = newDate.getMonth();
    var year = newDate.getFullYear();

    return monthNames[monthIndex] + " " + day + ", " + year;
  }

  cutString(string) {
    if (string.length > 300) {
      string = string.slice(0, 250) + "...";
    } else {
      null;
    }
    return string;
  }
  render() {
    const movies = this.state.movies.map((e, i) => {
      var date = moment(e.release_date).format("LL");
      var overview = this.cutString(e.overview);
      return (
        <div key={e.id} className="poster_card card">
          <div className="image_content">
            <Link to={`/movies/${e.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                width="185px"
                height="278px"
                alt=""
              />
            </Link>
          </div>
          <div className="info">
            <div className="wrapper">
              <div className="outer_ring">
                <div
                  className="user_score_chart 55b23927c3a368648e00ed60"
                  data-percent="67.0"
                  data-track-color="#423d0f"
                  data-bar-color="#d2d531"
                >
                  <div className="percent">
                    <span className="icon icon-r67" />
                  </div>
                  <canvas height="32" width="32" />
                </div>
              </div>
              <div className="flex">
                <a
                  id="movie_351286"
                  className="title_result"
                  href="/movie/351286?language=en"
                  title=""
                  alt="#"
                >
                  {e.title}
                </a>
                <span>{date}</span>
              </div>
            </div>
            <p className="overview">{overview}</p>
            <p className="view_more">
              <Link className="link" to={`/movies/${e.id}`}>
                View More
              </Link>
            </p>
          </div>
        </div>
      );
    });
    return (
      <div className="AllMovies-root">
        <div className="AllMovies-search">
          <input
            placeholder="Search for a movie or a person..."
            className="AllMovies-search-bar"
          />
        </div>
        <h2 className="popular-movies-h2">Popular Movies</h2>
        <div className="container">{movies}</div>
      </div>
    );
  }
}
