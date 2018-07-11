import React, { Component } from "react";
import Search from './../SearchMovies/Search'
import axios from "axios";
import "./NowPlayingMovies.css";
import { Link } from "react-router-dom";
import { Doughnut, Bar } from "react-chartjs-2";


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

  nextPage = () => {
    this.setState({
      page: this.state.page += 1
    })
    this.getMovies()
    window.scrollTo(0, 0)
  }

  previousPage = () => {
    this.setState({
      page: this.state.page -= 1
    })
    this.getMovies()
    window.scrollTo(0, 0)
  }


  cutString(string) {
    if (string.length > 250) {
      string = string.slice(0, 200) + "...";
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
      let vote = e.vote_average * 10
      const color = function () {

        if (vote < 50) {
          return 'red'
        }
        else if (vote < 70) {
          return 'yellow'
        }
        else {
          return '#00DB76'
        }
      }
      const bg_color = function () {

        if (vote < 50) {
          return '#8B0000'
        }
        else if (vote < 70) {
          return '#423F04'
        }
        else {
          return '#0A4827'
        }
      }
      let doughnutData = {
        datasets: [{
          label: 'Red',
          data: [e.vote_average * 10, 100 - e.vote_average * 10],
          backgroundColor: [
            color(),
            bg_color()
          ]
        }]
      };
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
            <div className="individual_doughnut_container">
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
              </div>
              <div className="movie_card_rating">{e.vote_average * 10} <span className="individual_percentage">%</span></div>
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
        <span className = 'page_btns_container'><button className='previous_btn' onClick={this.previousPage}></button>
          <button className='next_btn' onClick={this.nextPage}></button></span>


      </div>
    );
  }
}
