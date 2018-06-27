import React, { Component } from "react";
import axios from "axios";
import "./AllMovies.css";
import { Link } from "react-router-dom";

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
      console.log(res);
      this.setState({ movies: res.data.results });
    } catch (err) {
      console.error("componentDidMount failed in AllMovies component:", err);
    }
  };
  render() {
    const movies = this.state.movies.map((e, i) => {
      return (
        <div key={e.id}>
        <Link to={`/movies/${e.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
            width="185px"
            height="278px"
            alt=''
          />
        </Link>
          <h3>{e.title}</h3>
          <h3>{e.release_date}</h3>
          <p>{e.overview}</p>
        </div>
      );
    });
    return (
      <div>
        <div className="AllMovies-search">
          <input
            placeholder="Search for a movie or a person..."
            className="AllMovies-search-bar"
          />
        </div>
        <h2>Popular Movies</h2>
        {movies}
      </div>
    );
  }
}
