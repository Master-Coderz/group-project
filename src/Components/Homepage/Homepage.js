import React, { Component } from "react";
import axios from "axios";
import {Carousel} from 'react-bootstrap'
export default class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      upcomingMovies: [],
      popularMovies: [],
      inTheaters: []
    };
  }

  componentDidMount() {
    this.getUpcoming();
    this.getPopular();
    this.getInTheaters();
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

  getInTheaters(){
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
  ).then((res) => {
      this.setState({
        inTheaters: res.data.results
      });
    });
  }

  render() {
    console.log(this.state.inTheaters);

    const upcomingMovies = this.state.upcomingMovies.map((element, index) => {
      return(
        <Carousel.Item className='carousel-item' key = {index} >
        <img className = 'carousel-img' width={400} height={200} alt="700x300" src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`} />
        <Carousel.Caption>
          <h3>{element.title}</h3>
          <p>{element.release_date}</p>
        </Carousel.Caption>
      </Carousel.Item>
      )
    } )
    return (
      <div>
        <span>I am Homepage</span>
        <Carousel>
          {upcomingMovies}
        </Carousel>;
      </div>
    );
  }
}
