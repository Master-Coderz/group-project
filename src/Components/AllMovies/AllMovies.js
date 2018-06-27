import React, { Component } from "react";
import axios from "axios";

export default class AllMovies extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    };
  }

  componentDidMount = async () => {
    try {
      const [results] = await axios.get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      );
      console.log(results)
    } catch (err) {
      console.error("componentDidMount failed in AllMovies component:", err);
    }
  };
  render() {
    return (
      <div>
        <h1>I am AllMovies</h1>
      </div>
    );
  }
}
