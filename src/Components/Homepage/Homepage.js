import React, { Component } from "react";
import axios from "axios";
import './Homepage.css';
import {Link} from 'react-router-dom'
export default class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      upcomingMovies: [],
      popularMovies: [{}],
      inTheaters: []
    };
  }

  componentDidMount() {
    this.getUpcoming();
    this.getPopular();
    this.getInTheaters();
    axios.get('/auth/me').then((res) => {
    })
  }

  getUpcoming() {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      )
      .then(res => {
        this.setState({
          upcomingMovies: res.data.results
        });
      });
  }

  getPopular() {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    ).then((res) => {
      this.setState({
        popularMovies: res.data.results
      });
    });
  }

  getInTheaters() {
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
    ).then((res) => {
      this.setState({
        inTheaters: res.data.results
      });
    });
  }

  render() {
    let popularMovies = this.state.popularMovies.map((e, i) => {
      return (

        <div className="tile">
          <div className="tile__media">
            <img className="tile__img" src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} alt="" />
          </div>
          <div className="tile__details">
            <button className='add_to_watchlist_btn'></button>
            <Link to={`/movies/${e.id}`}>
            <div className="tile__title">
              {e.title}
            </div>
            </Link>
          </div>
        </div>


      )
    })
    console.log(popularMovies)
    return (
      <div className='contain'>
        <h2 className='movies_type'>Popular Movies</h2>
        <div className='row'>
          <div className='row__inner'>
            {popularMovies}
          </div>
        </div>
      </div>
    );
  }
}
