import React, { Component } from "react";
import axios from "axios";
import {Carousel} from 'react-bootstrap';
import './Homepage.css';
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
      // console.log(element.backdrop_path, element.poster_path)
      var url = 'https://image.tmdb.org/t/p/w500/'
      return(
        <Carousel.Item className='carousel-item' key = {index} >
        <img className = 'carousel-img-background'src={`${url}${element.backdrop_path}`} alt=""/>
        <img className = 'carousel-img' alt="700x300" src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`} />
        <Carousel.Caption>
          <h3>{element.title}</h3>
          <p>{element.release_date}</p>
        </Carousel.Caption>
      </Carousel.Item>
      )})
      const inTheaters = this.state.inTheaters.map((element, index) => {
        // console.log(element.backdrop_path, element.poster_path)
        var url = 'https://image.tmdb.org/t/p/w500/'
        return(
          <Carousel.Item className='carousel-item' key = {index} >
          <img className = 'carousel-img-background'src={`${url}${element.backdrop_path}`} alt=""/>
          <img className = 'carousel-img' alt="700x300" src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`} />
          <Carousel.Caption>
            <h3>{element.title}</h3>
            <p>{element.release_date}</p>
          </Carousel.Caption>
        </Carousel.Item>
        )})

    return (
      <div>
        <Carousel slide = 'true' interval="2000" className = 'carousel'>
          {upcomingMovies}
        </Carousel>
        <div className="popular">
        <div className="column">
        
        </div>
        <div className="column">

        </div>
        </div>
        <Carousel interval = '2000' className = 'carousel'>
          {inTheaters}
        </Carousel>
      </div>
    );
  }
}
