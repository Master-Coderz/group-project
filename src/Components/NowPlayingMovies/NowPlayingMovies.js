import React, { Component } from "react";
import Search from './../SearchMovies/Search'
import axios from "axios";
import "./NowPlayingMovies.css";
import { Link } from "react-router-dom";

const moment = require("moment");
export default class NowPlayingMovies extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      page: 1
    };
  }

  componentDidMount() {
    this.getMovies()
  }


  getMovies = async () => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${
        process.env.REACT_APP_API_KEY
        }&language=en-US&page=${this.state.page}`
      );
      console.log(res);
      this.setState({ movies: res.data.results });
    } catch (err) {
      console.error("componentDidMount failed in NowPlayingMovies component:", err);
    }
  };

  loadMore = () => {
    this.setState({
      page: this.state.page + 1
    })
    this.getMovies()
    window.scrollTo(0, 0)
  }

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
    const movies = this.state.movies.filter((elem, i) => {
      console.log(elem)
      return elem.original_language === 'en'
    }).map((e, i) => {
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
      <div className="NowPlayingMovies-root">
        <Search />
        <h2 className="popular-movies-h2">Now Playing</h2>
        <div className="top_rated_container">{movies}</div>
        <button onClick={this.loadMore}>Load More...</button>

      </div>
    );
  }
}
