import React, { Component } from "react";
import axios from "axios";
import { Carousel } from 'react-bootstrap'
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
    axios.get('/auth/me').then((res) => {
    } )
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
   
    const popularMovies = this.state.popularMovies.map((element, i)=>{
      if(i===0 || i === 1 || i ===4 || i ===5){ 
        return  <img className = 'popular-img-sm' alt="700x300" src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`} />
      }
      else{
        return  <img className = 'popular-img-lg' alt="700x300" src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`} />
      }
    })
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
      <div className = 'homepage-root'> 
        <Carousel interval="2000" className = 'carousel'>
          {upcomingMovies}
        </Carousel>
        <div className="popular">
        <div className="column">
        <div className="column-top">
            <a href="">{popularMovies[0]}</a>
            <a href="">{popularMovies[1]}</a>
        </div>
        <div className="column-bottom"><a href="">{popularMovies[2]}</a></div>
        </div>
        <div className="column">
        <div className="column-bottom">
            <a href="">{popularMovies[3]}</a>
        </div>
        <div className="column-top"><a href="">{popularMovies[4]}</a>
        <a href="">{popularMovies[5]}</a>
        </div>
        </div>
        </div>
        <Carousel interval = '2000' className = 'carousel'>
          {inTheaters}
        </Carousel>
      </div>
    );
  }
}
