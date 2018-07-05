import React, { Component } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'
import Carousel2 from 'nuka-carousel';
import {Button, SideNav, SideNavItem} from 'react-materialize'
import { Carousel } from 'react-bootstrap';
import './Homepage.css';
export default class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      upcomingMovies: [],
      popularMovies: [],
      inTheaters: [],
      similarMovies: [],
      watchlist: []
    };
  }

  componentDidMount() {
    this.getUpcoming();
    this.getPopular();
    this.getInTheaters();
    this.getWatchlist()
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

  getSimilar(){
    axios.get(`https://api.themoviedb.org/3/movie/${550}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
    .then(res => {
      this.setState({
        similarMovies: res.data
      })
    })
  }


  addToWatchlist = () => {
    axios.post(`/api/addToWatchlist/${3}`);
  };

  getWatchlist(){
    axios.get('/api/getWatchlist')
    .then((res) => {
      this.setState({
        watchlist: res.data
      })
    } )
  }


  render() {

    const userWatchlist = this.state.watchlist.map((e, i) => {
      return(


        <SideNavItem  href={null}key={e.id}>
        <div>
        <Link to={`/movies/${e.movie_id}`} >
             <img className='watchlist-img' src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} alt=''/>
        </Link>
        </div>
        </SideNavItem>
       
      )
    } )

    const popularMovies = this.state.popularMovies.map((element, i) => {
      if (i === 0 || i === 1 || i === 4 || i === 5) {
        return <img className='popular-img-sm' alt="700x300" src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`} />

      }
      else {
        return <img className='popular-img-lg' alt="700x300" src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`} />
      }
    })
    const upcomingMovies = this.state.upcomingMovies.map((element, index) => {
      // console.log(element.backdrop_path, element.poster_path)
      var url = 'https://image.tmdb.org/t/p/w500/'
      return (
        <Carousel.Item className='carousel-item' key={index} >
          <img className='carousel-img-background' src={`${url}${element.backdrop_path}`} alt="" />
          <img className='carousel-img' alt="700x300" src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`} />
          <Carousel.Caption>
            <h3 classsName="title-h3">{element.title}</h3>
            <p className='release-date-p'>{element.release_date}</p>
          </Carousel.Caption>
        </Carousel.Item>
      )
    })


    
    const inTheaters = this.state.inTheaters.map((element, index) => {
      // console.log(element.backdrop_path, element.poster_path)
      var url = 'https://image.tmdb.org/t/p/w500/'
      return (
        <Carousel.Item className='carousel-item' key={index} >
          <img className='carousel-img-background' src={`${url}${element.backdrop_path}`} alt="" />
          <img className='carousel-img' alt="700x300" src={`https://image.tmdb.org/t/p/w500/${element.poster_path}`} />
          <Carousel.Caption>
            <h3>{element.title}</h3>
            <p>{element.release_date}</p>
          </Carousel.Caption>
        </Carousel.Item>
      )
    })

    return (
      <div className='homepage-root' >
{/*       
        <Carousel interval="2000" className='carousel top_carousel'>
          {upcomingMovies}
        </Carousel> */}
      {/* {upcomingMovies}
        < div className="content-divider" > <div className="inner_content"><a href="">Popular Movies</a><h2></h2></div></div>
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
        <div className="content-divider"><div className="inner_content2"><a href="">In Theaters</a><h2></h2></div></div>
        <Carousel slide='true' interval='2000' className='carousel'>
          {inTheaters}
        </Carousel> */}
        <button onClick={() => this.getSimilar()}>Get Similar</button>
        <div className='footer_img' />

   <SideNav
   className='sidenav'
  trigger={<Button>SIDE NAV DEMO</Button>}
  options={{ closeOnClick: true, edge: 'right' }}>
  
 {userWatchlist}
</SideNav>
      </div >
    );
  }
}
