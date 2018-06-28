import React, { Component } from "react";
import axios from "axios";
export default class Movie extends Component {
  constructor() {
    super();
    this.state = {
      movie: {},
      credits: { crew: [], cast: [] }
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
    } catch (err) {
      console.error("componentDidMount failed in Movie.js:", err);
    }
  };

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
        />
        <p>{this.state.movie.overview}</p>
        <h2>Featured Crew</h2>
        {featuredCrew}
        <hr />
        <h2>Top Billed Cast</h2>
        {topBilledCast}
      </div>
    );
  }
}
